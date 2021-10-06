import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  MeDocument,
  MeQuery,
  useConfirmEmailMutation,
} from "../../../../generated/graphql";
import { useValidTmpTokenMutation } from "../../../../generated/graphql";
import { Loading } from "../../../../components/Loading";

interface ConfirmEmailProps {
  token: string;
}

export const Confirmation: React.FC<ConfirmEmailProps> = ({ token }) => {
  const [confirmEmail] = useConfirmEmailMutation();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(true);
  const [validToken, setValidToken] = useState<boolean>(false);

  const [verifyToken] = useValidTmpTokenMutation();

  useEffect(() => {
    const isTokenValid = async () => {
      setLoading(true);
      const res = await verifyToken({ variables: { token } });

      if (res.data && res.data.validTmpToken) {
        setValidToken(true);
        return;
      }
      setValidToken(false);
    };

    isTokenValid();
    setLoading(false);
  }, [token, verifyToken]);

  return !loading ? (
    <div>
      {validToken ? (
        <>
          <h2 style={{ width: "100%" }}>Confirm your email</h2>
          <button
            onClick={async () => {
              try {
                const { data } = await confirmEmail({
                  variables: { token },
                  update: (store, { data }) => {
                    if (!data) return null;
                    store.writeQuery<MeQuery>({
                      query: MeDocument,
                      data: {
                        __typename: "Query",
                        me: data.confirmUser.user,
                      },
                    });
                    return null;
                  },
                });
                if (data && data.confirmUser) {
                  history.push("/dashboard");
                }
              } catch (err) {}
            }}
            style={{ margin: "40px" }}
          >
            Confirm Your Email
          </button>
        </>
      ) : (
        <>
          <h2>Invalid Token</h2>
        </>
      )}
    </div>
  ) : (
    <Loading />
  );
};
