import { useQuery } from "@apollo/react-hooks";
import { ACCOUNT } from "queries/accounts";
import coercedGet from "utils/coercedGet";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "store/reducers/auth";
import ContentLoader from "./ContentLoader";

const ProfileCard = () => {
  const { userId } = useSelector(selectCurrentUser);
  const { data, loading } = useQuery(ACCOUNT, {
    variables: {
      id: userId,
    },
  });

  const account = coercedGet(data, "account", {});

  return (
    <div className="profile-card">
      {loading ? (
        <ContentLoader />
      ) : (
        <>
          <img
            src={account?.avatar?.url}
            width={300}
            height={300}
            alt="user"
            className="profile-photo"
          />
          <h5>
            <a href="timeline" className="text-white">
              {account?.firstName} {account?.lastName}
            </a>
          </h5>
          <a href="#" className="text-white">
            <i className="ion ion-android-person-add"></i> 0 followers
          </a>
        </>
      )}
    </div>
  );
};

export default ProfileCard;
