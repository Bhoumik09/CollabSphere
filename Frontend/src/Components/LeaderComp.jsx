import React from "react";
function LeaderComp({data,index}) {
  return (
    <div>
      <div className="box">
        <div>{index}</div>
        <div>{data.name}</div>
        <div>{data.coins}</div>
      </div>
    </div>
  );
}

export default LeaderComp;
