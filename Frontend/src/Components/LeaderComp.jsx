import React from "react";
import { Link } from "react-router-dom";
function LeaderComp({data,index,user}) {
  return (
    <div>
      <Link to={`/app/profile/${data.id}`} className="box" id={data.id} o>
        <div className="id">{index}</div>
        <div className="id-name">{data.name}</div>
        <div className="id-coins"> {data.coins}</div>
      </Link>
    </div>
  );
}

export default LeaderComp;
