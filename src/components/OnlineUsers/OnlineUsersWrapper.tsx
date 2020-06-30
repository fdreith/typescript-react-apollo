import React, { useEffect } from "react";
import OnlineUser from "./OnlineUser";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const UPDATE_LASTSEEN_MUTATION = gql`
   mutation updateLastSeen ($now: timestamptz!) {
     update_users(where: {}, _set: {last_seen: $now}) {
       affected_rows
     }
   }
 `;

const OnlineUsersWrapper = () => {

  const [updateLastSeen] = useMutation(UPDATE_LASTSEEN_MUTATION);

  useEffect(() => {
    const onlineIndicator = setInterval(() => updateLastSeen({ variables: { now: (new Date()).toISOString() } }), 30000);
    return () => clearInterval(onlineIndicator);
  });

  const online_users = [
    { name: "someUser1" },
    { name: "someUser2" }
  ];

  const onlineUsersList = online_users.map((user, index) => (
    <OnlineUser
      user={user}
      key={index}
    />)
  );

  return (
    <div className="onlineUsersWrapper">
      <div className="sliderHeader">
        Online users - {online_users.length}
      </div>
      { onlineUsersList }
    </div>
  );

}

export default OnlineUsersWrapper;
