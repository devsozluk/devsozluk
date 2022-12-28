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

  return <></>;
};

export default Redirect;
