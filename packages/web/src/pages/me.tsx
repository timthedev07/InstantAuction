import {
  accessErrMessage,
  useMeQuery,
  useUpdateEmailVisibilityMutation
} from "client-controllers";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoginPage } from "../components/pages/LoginPage";
import { getHeadForPage } from "../utils/getHeadForPage";
import { withApollo } from "../utils/withApollo";
import { FormLabel, Switch } from "@chakra-ui/react";
import ReactTooltip from "react-tooltip";
import { AiFillEye } from "@react-icons/all-files/ai/AiFillEye";
import { AiFillLock } from "@react-icons/all-files/ai/AiFillLock";
import { UserTabs } from "../components/UserTabs";
import { HStack } from "../components/utils/Stack";
import { useAlert } from "../contexts/AlertContext";

const MePage: NextPage = () => {
  const { query, isReady, asPath } = useRouter();
  const { data, loading } = useMeQuery({
    ssr: false
  });
  const { triggerAlert } = useAlert();
  const [checked, setChecked] = useState(false);
  const [updateEmailVisibility] = useUpdateEmailVisibilityMutation();

  useEffect(() => {
    if (!data || !data.me) return;
    setChecked(data.me.emailPublic);
  }, [data]);

  useEffect(() => {
    console.log(
      "State update, it's now " + (checked ? "checked" : "not checked")
    );
  }, [checked]);

  const handleChange = async () => {
    const newVal = !checked;
    setChecked(newVal);

    try {
      await updateEmailVisibility({
        variables: {
          newEmailPublic: newVal
        }
      });
    } catch (err) {
      setChecked(!newVal);
      triggerAlert(accessErrMessage(err), "warning");
    }
  };

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
      <>
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
            <HStack className="items-center gap-2 justify-center">
              <FormLabel m={0} htmlFor="visibility-switch">
                <AiFillLock />
              </FormLabel>
              <Switch
                id="visibility-switch"
                data-tip={checked ? "Public" : "Private"}
                isChecked={checked}
                onChange={handleChange}
              />
              <FormLabel m={0} htmlFor="visibility-switch">
                <AiFillEye />
              </FormLabel>
            </HStack>
          </div>
        </section>
        {isReady ? <UserTabs tab={query.t as string | undefined} /> : ""}
      </>
    </>
  );
};

export default withApollo({ ssr: true })(MePage);
