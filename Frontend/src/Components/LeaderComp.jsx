import React from "react";
import { Link } from "react-router-dom";
function LeaderComp({data,index,user}) {
  return (
    <div>
      <Link to={`/app/profile/${data.id}`} className="box" id={data.id} o>
        <div>{index}</div>
        <div>{data.name}</div>
        <div>{data.coins}</div>
      </Link>
    </div>
  );
}

export default LeaderComp;
