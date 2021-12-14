import {
  useMeQuery,
  useUpdateEmailVisibilityMutation
} from "client-controllers";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoginPage } from "../components/pages/LoginPage";
import { getHeadForPage } from "../utils/getHeadForPage";
import { withApollo } from "../utils/withApollo";
import Switch from "@mui/material/Switch";
import ReactTooltip from "react-tooltip";
import { Stack, Typography } from "@mui/material";
import { AiFillEye } from "@react-icons/all-files/ai/AiFillEye";
import { AiFillLock } from "@react-icons/all-files/ai/AiFillLock";
import { UserTabs } from "../components/UserTabs";

const MePage: NextPage = () => {
  const { query, isReady, asPath } = useRouter();
  const { data, loading } = useMeQuery({
    ssr: false
  });
  const [checked, setChecked] = useState(false);
  const [updateEmailVisibility] = useUpdateEmailVisibilityMutation();

  useEffect(() => {
    if (!data || !data.me) return;
    setChecked(data.me.emailPublic);
  }, [data]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = event.target.checked;
    setChecked(newVal);

    await updateEmailVisibility({
      variables: {
        newEmailPublic: newVal
      }
    });
  };

  useEffect(() => {
    if (!isReady) return;
    const requestedTab = query.t;
    console.log(requestedTab);
  }, [isReady]);

  if (loading) {
    return <></>;
  }

  if (!data || !data.me) {
    return <LoginPage />;
  }

  return (
    <>
      {getHeadForPage({
        description: `User: ${data.me.username}`,
        path: asPath,
        title: `user - ${data.me.username}`
      })}
      <ReactTooltip key={checked ? "dfdf" : "svsv"} />
      <div>
        <section className="w-11/12 flex items-start flex-col p-8">
          {/* User information component */}
          <div className="flex justify-start gap-4 items-center my-5">
            <img
              src={data.me.avatarUrl}
              className="rounded-full w-24 h-24 object-cover"
            />
            <h2>{data.me.username}</h2>
          </div>
          <div className="rounded-md border border-gray-500 p-3 flex justify-around gap-8 items-center bg-neutral-800">
            <h5>{data.me.email}</h5>
            <Stack direction="row" alignItems="center">
              <Typography>
                <AiFillLock />
              </Typography>
              <Switch
                key={checked ? "PublicSwitch" : "PrivateSwitch"}
                data-tip={checked ? "Public" : "Private"}
                checked={checked}
                onChange={handleChange}
                color="info"
              />
              <Typography>
                <AiFillEye />
              </Typography>
            </Stack>
          </div>
        </section>
        {isReady ? <UserTabs tab={query.t as string | undefined} /> : ""}
      </div>
    </>
  );
};

export default withApollo({ ssr: true })(MePage);
