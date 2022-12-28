import Spinner from "@/components/Loading";
import { getAuthGrant } from "@/store/auth/authThunk";
import { useAppDispatch } from "@/utils/hooks";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAuthGrant()).then(() => navigate("/"));
  }, []);

  return (
    <div className="h-full flex justify-center items-center">
      <Spinner size="md" />
    </div>
  );
};

export default Redirect;
