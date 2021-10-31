import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Auction = {
  __typename?: 'Auction';
  bids: Array<Bid>;
  dateCreated: Scalars['DateTime'];
  dateUpdated: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['Int'];
  seller: User;
  title: Scalars['String'];
};

export type Bid = {
  __typename?: 'Bid';
  auction: Auction;
  bidder: User;
  id: Scalars['Int'];
  item: Item;
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['Int'];
  name: Scalars['String'];
  picture: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteAccount: Scalars['Boolean'];
  discordOAuth: OAuthResponse;
  googleOAuth: OAuthResponse;
  logout: Scalars['Boolean'];
  updateCredentials: User;
};


export type MutationDeleteAccountArgs = {
  email: Scalars['String'];
};


export type MutationDiscordOAuthArgs = {
  code: Scalars['String'];
};


export type MutationGoogleOAuthArgs = {
  code: Scalars['String'];
};


export type MutationUpdateCredentialsArgs = {
  username?: Maybe<Scalars['String']>;
};

export type OAuthResponse = {
  __typename?: 'OAuthResponse';
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  testUpload: Scalars['Boolean'];
  users: Array<User>;
};


export type QueryTestUploadArgs = {
  file: Scalars['Upload'];
};

export type User = {
  __typename?: 'User';
  auctionsBid: Array<Auction>;
  auctionsOwned: Array<Auction>;
  avatarUrl: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  provider?: Maybe<Scalars['String']>;
  reputation: Scalars['Int'];
  transactionCount: Scalars['Int'];
  username: Scalars['String'];
};

export type DiscordOAuthMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type DiscordOAuthMutation = { __typename?: 'Mutation', discordOAuth: { __typename?: 'OAuthResponse', user?: { __typename?: 'User', id: number, email: string, username: string, provider?: string | null | undefined, avatarUrl: string, transactionCount: number, reputation: number } | null | undefined } };

export type GoogleOAuthMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type GoogleOAuthMutation = { __typename?: 'Mutation', googleOAuth: { __typename?: 'OAuthResponse', user?: { __typename?: 'User', id: number, email: string, username: string, provider?: string | null | undefined, avatarUrl: string, transactionCount: number, reputation: number } | null | undefined } };

export type DeleteAccountMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: boolean };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, email: string, username: string, provider?: string | null | undefined, avatarUrl: string, transactionCount: number, reputation: number } | null | undefined };

export type TestUploadQueryVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type TestUploadQuery = { __typename?: 'Query', testUpload: boolean };

export type UpdateCredentialsMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type UpdateCredentialsMutation = { __typename?: 'Mutation', updateCredentials: { __typename?: 'User', id: number, email: string, username: string, provider?: string | null | undefined, avatarUrl: string, transactionCount: number, reputation: number } };


export const DiscordOAuthDocument = gql`
    mutation DiscordOAuth($code: String!) {
  discordOAuth(code: $code) {
    user {
      id
      email
      username
      provider
      avatarUrl
      transactionCount
      reputation
    }
  }
}
    `;
export type DiscordOAuthMutationFn = Apollo.MutationFunction<DiscordOAuthMutation, DiscordOAuthMutationVariables>;

/**
 * __useDiscordOAuthMutation__
 *
 * To run a mutation, you first call `useDiscordOAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDiscordOAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [discordOAuthMutation, { data, loading, error }] = useDiscordOAuthMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useDiscordOAuthMutation(baseOptions?: Apollo.MutationHookOptions<DiscordOAuthMutation, DiscordOAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DiscordOAuthMutation, DiscordOAuthMutationVariables>(DiscordOAuthDocument, options);
      }
export type DiscordOAuthMutationHookResult = ReturnType<typeof useDiscordOAuthMutation>;
export type DiscordOAuthMutationResult = Apollo.MutationResult<DiscordOAuthMutation>;
export type DiscordOAuthMutationOptions = Apollo.BaseMutationOptions<DiscordOAuthMutation, DiscordOAuthMutationVariables>;
export const GoogleOAuthDocument = gql`
    mutation GoogleOAuth($code: String!) {
  googleOAuth(code: $code) {
    user {
      id
      email
      username
      provider
      avatarUrl
      transactionCount
      reputation
    }
  }
}
    `;
export type GoogleOAuthMutationFn = Apollo.MutationFunction<GoogleOAuthMutation, GoogleOAuthMutationVariables>;

/**
 * __useGoogleOAuthMutation__
 *
 * To run a mutation, you first call `useGoogleOAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGoogleOAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [googleOAuthMutation, { data, loading, error }] = useGoogleOAuthMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useGoogleOAuthMutation(baseOptions?: Apollo.MutationHookOptions<GoogleOAuthMutation, GoogleOAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GoogleOAuthMutation, GoogleOAuthMutationVariables>(GoogleOAuthDocument, options);
      }
export type GoogleOAuthMutationHookResult = ReturnType<typeof useGoogleOAuthMutation>;
export type GoogleOAuthMutationResult = Apollo.MutationResult<GoogleOAuthMutation>;
export type GoogleOAuthMutationOptions = Apollo.BaseMutationOptions<GoogleOAuthMutation, GoogleOAuthMutationVariables>;
export const DeleteAccountDocument = gql`
    mutation DeleteAccount($email: String!) {
  deleteAccount(email: $email)
}
    `;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    username
    provider
    avatarUrl
    transactionCount
    reputation
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const TestUploadDocument = gql`
    query TestUpload($file: Upload!) {
  testUpload(file: $file)
}
    `;

/**
 * __useTestUploadQuery__
 *
 * To run a query within a React component, call `useTestUploadQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestUploadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestUploadQuery({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useTestUploadQuery(baseOptions: Apollo.QueryHookOptions<TestUploadQuery, TestUploadQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestUploadQuery, TestUploadQueryVariables>(TestUploadDocument, options);
      }
export function useTestUploadLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestUploadQuery, TestUploadQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestUploadQuery, TestUploadQueryVariables>(TestUploadDocument, options);
        }
export type TestUploadQueryHookResult = ReturnType<typeof useTestUploadQuery>;
export type TestUploadLazyQueryHookResult = ReturnType<typeof useTestUploadLazyQuery>;
export type TestUploadQueryResult = Apollo.QueryResult<TestUploadQuery, TestUploadQueryVariables>;
export const UpdateCredentialsDocument = gql`
    mutation UpdateCredentials($username: String!) {
  updateCredentials(username: $username) {
    id
    email
    username
    provider
    avatarUrl
    transactionCount
    reputation
  }
}
    `;
export type UpdateCredentialsMutationFn = Apollo.MutationFunction<UpdateCredentialsMutation, UpdateCredentialsMutationVariables>;

/**
 * __useUpdateCredentialsMutation__
 *
 * To run a mutation, you first call `useUpdateCredentialsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCredentialsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCredentialsMutation, { data, loading, error }] = useUpdateCredentialsMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUpdateCredentialsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCredentialsMutation, UpdateCredentialsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCredentialsMutation, UpdateCredentialsMutationVariables>(UpdateCredentialsDocument, options);
      }
export type UpdateCredentialsMutationHookResult = ReturnType<typeof useUpdateCredentialsMutation>;
export type UpdateCredentialsMutationResult = Apollo.MutationResult<UpdateCredentialsMutation>;
export type UpdateCredentialsMutationOptions = Apollo.BaseMutationOptions<UpdateCredentialsMutation, UpdateCredentialsMutationVariables>;