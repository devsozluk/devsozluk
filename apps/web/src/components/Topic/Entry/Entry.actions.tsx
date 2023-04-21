import {
  useDeleteEntryMutation,
  useDeleteEntryVoteMutation,
  useEntryVoteMutation,
} from "@/services/topic";
import { IProfile } from "@/types";
import { useAppSelector } from "@/utils/hooks";
import { Dropdown, IconButton } from "@devsozluk/ui";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const EntryActions = ({
  author,
  id,
  upvotes: initialUpvotes,
  downvotes: initialDownvotes,
}: {
  author: IProfile;
  id: number;
  upvotes: number;
  downvotes: number;
}) => {
  const [deleteEntry] = useDeleteEntryMutation();
  const [handleEntryVote, { data, error, isLoading, status }] =
    useEntryVoteMutation();
  const [
    deleteEntryVote,
    { data: deleteData, isLoading: deleteIsLoading, status: deleteStatus },
  ] = useDeleteEntryVoteMutation();

  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);

  useEffect(() => {
    setUpvotes(initialUpvotes);
    setDownvotes(initialDownvotes);
  }, [initialUpvotes, initialDownvotes]);

  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  const userVotes = useAppSelector((state) => state.user.votes);

  const hasUserVote = userVotes?.find((vote) => vote.entry == id);
  const hasUpVote = userVotes?.find((vote) => vote.entry == id && vote.upvoted);
  const hasDownVote = userVotes?.find(
    (vote) => vote.entry == id && vote.downvoted
  );

  const handleVote = async (type: "up" | "down") => {
    if (!isLoggedIn)
      return toast.error("Entry'e oy vermek için lütfen önce giriş yapın.");

    if (
      (hasUserVote?.downvoted && type === "down") ||
      (hasUserVote?.upvoted && type === "up")
    ) {
      await deleteEntryVote({
        author: user?.id as string,
        entry: id as number,
      });
    } else {
      if (hasUserVote)
        await deleteEntryVote({
          author: user?.id as string,
          entry: id as number,
        });
      await handleEntryVote({
        author: user?.id as string,
        entry: id as number,
        type,
      });
    }
  };

  useEffect(() => {
    if (status === "fulfilled" && data) {
      if (data.upvoted) setUpvotes((prevCount) => prevCount + 1);
      else setDownvotes((prevCount) => prevCount + 1);
    }
  }, [status]);

  useEffect(() => {
    if (deleteStatus === "fulfilled" && deleteData) {
      if (deleteData.upvoted) {
        setUpvotes((prevCount) => prevCount - 1);
      } else if (deleteData.downvoted) {
        setDownvotes((prevCount) => prevCount - 1);
      }
    }
  }, [deleteStatus]);

  const handleDeleteEntry = () => {
    deleteEntry({ id });
  };

  return (
    <div className="flex items-center gap-x-2 text-xs font-bold">
      <IconButton
        isActive={hasUpVote}
        disabled={isLoading || deleteIsLoading}
        onClick={() => handleVote("up")}
      >
        <GoTriangleUp size={14} />
        {upvotes}
      </IconButton>
      <IconButton
        isActive={hasDownVote}
        disabled={isLoading || deleteIsLoading}
        onClick={() => handleVote("down")}
      >
        <GoTriangleDown size={14} />
        {downvotes}
      </IconButton>
      <Dropdown>
        <Dropdown.Button as={IconButton}>
          <HiOutlineDotsHorizontal size={14} />
        </Dropdown.Button>
        {author.id === user?.id && (
          <Dropdown.Item onClick={handleDeleteEntry}>Yanıtı Sil</Dropdown.Item>
        )}
        <Dropdown.Item>Şikayet Et</Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default EntryActions;
