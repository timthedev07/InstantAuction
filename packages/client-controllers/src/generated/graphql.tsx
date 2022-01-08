import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  id: Scalars['String'];
  item: Item;
  seller: User;
  status: Scalars['String'];
  title: Scalars['String'];
  winner?: Maybe<User>;
};

export type AuctionsResponse = {
  __typename?: 'AuctionsResponse';
  auctions: Array<Auction>;
  count: Scalars['Int'];
};

export type Bid = {
  __typename?: 'Bid';
  auction: Auction;
  bidder: User;
  id: Scalars['Int'];
  item: Item;
  won: Scalars['Boolean'];
};

export type BidsResponse = {
  __typename?: 'BidsResponse';
  bids: Array<Bid>;
  count: Scalars['Int'];
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['Int'];
  name: Scalars['String'];
  owner: User;
  picture: Scalars['String'];
};

export type ModifyAuctionPartialUpdate = {
  description?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  closeAuction: Auction;
  createAuction: Auction;
  createBid: Bid;
  createItem: Item;
  createItemWithPictureUrl: Item;
  deleteAccount: Scalars['Boolean'];
  deleteAuction: Scalars['Boolean'];
  deleteBid: Scalars['Boolean'];
  deleteItem: Scalars['Boolean'];
  discordOAuth: OAuthResponse;
  endAuction: Auction;
  googleOAuth: OAuthResponse;
  logout: Scalars['Boolean'];
  microsoftOAuth: OAuthResponse;
  modifyAuction: Auction;
  modifyItem: Item;
  updateCredentials: User;
  updateEmailVisibility: User;
};


export type MutationCloseAuctionArgs = {
  auctionId: Scalars['String'];
};


export type MutationCreateAuctionArgs = {
  description: Scalars['String'];
  itemId: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationCreateBidArgs = {
  auctionId: Scalars['String'];
  itemId: Scalars['Int'];
};


export type MutationCreateItemArgs = {
  name: Scalars['String'];
  picture: Scalars['Upload'];
};


export type MutationCreateItemWithPictureUrlArgs = {
  name: Scalars['String'];
  pictureUrl: Scalars['String'];
};


export type MutationDeleteAccountArgs = {
  email: Scalars['String'];
};


export type MutationDeleteAuctionArgs = {
  auctionId: Scalars['String'];
};


export type MutationDeleteBidArgs = {
  bidId: Scalars['Int'];
};


export type MutationDeleteItemArgs = {
  itemId: Scalars['Int'];
};


export type MutationDiscordOAuthArgs = {
  code: Scalars['String'];
};


export type MutationEndAuctionArgs = {
  auctionId: Scalars['String'];
  winningBidId: Scalars['Int'];
};


export type MutationGoogleOAuthArgs = {
  code: Scalars['String'];
};


export type MutationMicrosoftOAuthArgs = {
  code: Scalars['String'];
};


export type MutationModifyAuctionArgs = {
  auctionId: Scalars['String'];
  partialUpdate: ModifyAuctionPartialUpdate;
};


export type MutationModifyItemArgs = {
  itemId: Scalars['Int'];
  newName?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['Upload']>;
};


export type MutationUpdateCredentialsArgs = {
  username?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateEmailVisibilityArgs = {
  newEmailPublic: Scalars['Boolean'];
};

export type OAuthResponse = {
  __typename?: 'OAuthResponse';
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  allAuctions: AuctionsResponse;
  auctionsBid: AuctionsResponse;
  auctionsOwned: AuctionsResponse;
  getAuction?: Maybe<Auction>;
  getBid?: Maybe<Bid>;
  getUserBids: BidsResponse;
  hello: Scalars['String'];
  itemsOwned: UserItemsResponse;
  me?: Maybe<User>;
  testUpload: Scalars['Boolean'];
  users: Array<User>;
};


export type QueryGetAuctionArgs = {
  auctionId: Scalars['String'];
};


export type QueryGetBidArgs = {
  auctionId: Scalars['String'];
};


export type QueryItemsOwnedArgs = {
  excludeAuctionedOff: Scalars['Boolean'];
};


export type QueryTestUploadArgs = {
  file: Scalars['Upload'];
};

export type User = {
  __typename?: 'User';
  auctionsOwned: Array<Auction>;
  auctionsWon: Array<Auction>;
  avatarUrl: Scalars['String'];
  bids: Array<Bid>;
  email: Scalars['String'];
  emailPublic: Scalars['Boolean'];
  id: Scalars['String'];
  itemsOwned: Array<Item>;
  provider: Scalars['String'];
  reputation: Scalars['Int'];
  username: Scalars['String'];
};

export type UserItemsResponse = {
  __typename?: 'UserItemsResponse';
  count: Scalars['Int'];
  items: Array<Item>;
};

export type AllAuctionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllAuctionsQuery = { __typename?: 'Query', allAuctions: { __typename?: 'AuctionsResponse', count: number, auctions: Array<{ __typename?: 'Auction', id: string, title: string, description: string, status: string, dateCreated: any, dateUpdated: any, seller: { __typename?: 'User', username: string }, item: { __typename?: 'Item', id: number, picture: string, name: string }, winner?: { __typename?: 'User', username: string } | null | undefined }> } };

export type AuctionsBidAtQueryVariables = Exact<{ [key: string]: never; }>;


export type AuctionsBidAtQuery = { __typename?: 'Query', auctionsBid: { __typename?: 'AuctionsResponse', count: number, auctions: Array<{ __typename?: 'Auction', id: string, title: string, description: string, status: string, dateCreated: any, dateUpdated: any, seller: { __typename?: 'User', username: string }, item: { __typename?: 'Item', id: number, picture: string, name: string }, winner?: { __typename?: 'User', username: string } | null | undefined }> } };

export type AuctionsOwnedQueryVariables = Exact<{ [key: string]: never; }>;


export type AuctionsOwnedQuery = { __typename?: 'Query', auctionsOwned: { __typename?: 'AuctionsResponse', count: number, auctions: Array<{ __typename?: 'Auction', id: string, title: string, description: string, status: string, dateCreated: any, dateUpdated: any, seller: { __typename?: 'User', username: string }, item: { __typename?: 'Item', id: number, picture: string, name: string }, winner?: { __typename?: 'User', username: string } | null | undefined }> } };

export type CloseAuctionMutationVariables = Exact<{
  auctionId: Scalars['String'];
}>;


export type CloseAuctionMutation = { __typename?: 'Mutation', closeAuction: { __typename?: 'Auction', id: string, title: string, description: string, status: string, dateCreated: any, dateUpdated: any, seller: { __typename?: 'User', username: string }, item: { __typename?: 'Item', id: number, picture: string, name: string }, winner?: { __typename?: 'User', username: string } | null | undefined } };

export type CreateAuctionMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  itemId: Scalars['Int'];
}>;


export type CreateAuctionMutation = { __typename?: 'Mutation', createAuction: { __typename?: 'Auction', id: string, title: string, description: string, status: string, dateCreated: any, dateUpdated: any, seller: { __typename?: 'User', username: string }, item: { __typename?: 'Item', id: number, picture: string, name: string }, winner?: { __typename?: 'User', username: string } | null | undefined } };

export type DeleteAuctionMutationVariables = Exact<{
  auctionId: Scalars['String'];
}>;


export type DeleteAuctionMutation = { __typename?: 'Mutation', deleteAuction: boolean };

export type EndAuctionMutationVariables = Exact<{
  auctionId: Scalars['String'];
  winningBidId: Scalars['Int'];
}>;


export type EndAuctionMutation = { __typename?: 'Mutation', endAuction: { __typename?: 'Auction', id: string, title: string, description: string, status: string, dateCreated: any, dateUpdated: any, seller: { __typename?: 'User', username: string }, item: { __typename?: 'Item', id: number, picture: string, name: string }, winner?: { __typename?: 'User', username: string } | null | undefined } };

export type GetAuctionQueryVariables = Exact<{
  auctionId: Scalars['String'];
}>;


export type GetAuctionQuery = { __typename?: 'Query', getAuction?: { __typename?: 'Auction', id: string, title: string, description: string, status: string, dateCreated: any, dateUpdated: any, seller: { __typename?: 'User', username: string }, item: { __typename?: 'Item', id: number, picture: string, name: string }, winner?: { __typename?: 'User', username: string } | null | undefined, bids: Array<{ __typename?: 'Bid', id: number, won: boolean, item: { __typename?: 'Item', id: number, name: string, picture: string }, bidder: { __typename?: 'User', username: string } }> } | null | undefined };

export type ModifyAuctionMutationVariables = Exact<{
  partialUpdate: ModifyAuctionPartialUpdate;
  auctionId: Scalars['String'];
}>;


export type ModifyAuctionMutation = { __typename?: 'Mutation', modifyAuction: { __typename?: 'Auction', id: string, title: string, description: string, status: string, dateCreated: any, dateUpdated: any, seller: { __typename?: 'User', username: string }, item: { __typename?: 'Item', id: number, picture: string, name: string }, winner?: { __typename?: 'User', username: string } | null | undefined } };

export type CreateBidMutationVariables = Exact<{
  itemId: Scalars['Int'];
  auctionId: Scalars['String'];
}>;


export type CreateBidMutation = { __typename?: 'Mutation', createBid: { __typename?: 'Bid', id: number, won: boolean, bidder: { __typename?: 'User', username: string }, item: { __typename?: 'Item', id: number, picture: string, name: string } } };

export type DeleteBidMutationVariables = Exact<{
  bidId: Scalars['Int'];
}>;


export type DeleteBidMutation = { __typename?: 'Mutation', deleteBid: boolean };

export type UserBidsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserBidsQuery = { __typename?: 'Query', getUserBids: { __typename?: 'BidsResponse', count: number, bids: Array<{ __typename?: 'Bid', id: number, won: boolean, item: { __typename?: 'Item', id: number, name: string, picture: string }, bidder: { __typename?: 'User', username: string }, auction: { __typename?: 'Auction', id: string, item: { __typename?: 'Item', picture: string } } }> } };

export type GetBidQueryVariables = Exact<{
  auctionId: Scalars['String'];
}>;


export type GetBidQuery = { __typename?: 'Query', getBid?: { __typename?: 'Bid', id: number, won: boolean, item: { __typename?: 'Item', id: number, name: string, picture: string }, bidder: { __typename?: 'User', username: string }, auction: { __typename?: 'Auction', id: string, item: { __typename?: 'Item', picture: string } } } | null | undefined };

export type CreateItemMutationVariables = Exact<{
  name: Scalars['String'];
  picture: Scalars['Upload'];
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem: { __typename?: 'Item', id: number, picture: string, name: string } };

export type CreateItemWithPictureUrlMutationVariables = Exact<{
  pictureUrl: Scalars['String'];
  name: Scalars['String'];
}>;


export type CreateItemWithPictureUrlMutation = { __typename?: 'Mutation', createItemWithPictureUrl: { __typename?: 'Item', id: number, picture: string, name: string } };

export type DeleteItemMutationVariables = Exact<{
  itemId: Scalars['Int'];
}>;


export type DeleteItemMutation = { __typename?: 'Mutation', deleteItem: boolean };

export type ItemsOwnedQueryVariables = Exact<{
  excludeAuctionedOff: Scalars['Boolean'];
}>;


export type ItemsOwnedQuery = { __typename?: 'Query', itemsOwned: { __typename?: 'UserItemsResponse', count: number, items: Array<{ __typename?: 'Item', id: number, picture: string, name: string }> } };

export type ModifyItemMutationVariables = Exact<{
  itemId: Scalars['Int'];
  newName?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['Upload']>;
}>;


export type ModifyItemMutation = { __typename?: 'Mutation', modifyItem: { __typename?: 'Item', id: number, picture: string, name: string } };

export type TestUploadQueryVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type TestUploadQuery = { __typename?: 'Query', testUpload: boolean };

export type DiscordOAuthMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type DiscordOAuthMutation = { __typename?: 'Mutation', discordOAuth: { __typename?: 'OAuthResponse', user?: { __typename?: 'User', id: string, email: string, username: string, provider: string, avatarUrl: string, reputation: number, emailPublic: boolean } | null | undefined } };

export type GoogleOAuthMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type GoogleOAuthMutation = { __typename?: 'Mutation', googleOAuth: { __typename?: 'OAuthResponse', user?: { __typename?: 'User', id: string, email: string, username: string, provider: string, avatarUrl: string, reputation: number, emailPublic: boolean } | null | undefined } };

export type MicrosoftOAuthMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type MicrosoftOAuthMutation = { __typename?: 'Mutation', microsoftOAuth: { __typename?: 'OAuthResponse', user?: { __typename?: 'User', id: string, email: string, username: string, provider: string, avatarUrl: string, reputation: number, emailPublic: boolean } | null | undefined } };

export type DeleteAccountMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: boolean };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, username: string, provider: string, avatarUrl: string, reputation: number, emailPublic: boolean } | null | undefined };

export type UpdateCredentialsMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type UpdateCredentialsMutation = { __typename?: 'Mutation', updateCredentials: { __typename?: 'User', id: string, email: string, username: string, provider: string, avatarUrl: string, reputation: number, emailPublic: boolean } };

export type UpdateEmailVisibilityMutationVariables = Exact<{
  newEmailPublic: Scalars['Boolean'];
}>;


export type UpdateEmailVisibilityMutation = { __typename?: 'Mutation', updateEmailVisibility: { __typename?: 'User', id: string, email: string, username: string, provider: string, avatarUrl: string, reputation: number, emailPublic: boolean } };


export const AllAuctionsDocument = gql`
    query AllAuctions {
  allAuctions {
    count
    auctions {
      id
      title
      description
      seller {
        username
      }
      status
      dateCreated
      dateUpdated
      item {
        id
        picture
        name
      }
      winner {
        username
      }
    }
  }
}
    `;

/**
 * __useAllAuctionsQuery__
 *
 * To run a query within a React component, call `useAllAuctionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllAuctionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllAuctionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllAuctionsQuery(baseOptions?: Apollo.QueryHookOptions<AllAuctionsQuery, AllAuctionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllAuctionsQuery, AllAuctionsQueryVariables>(AllAuctionsDocument, options);
      }
export function useAllAuctionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllAuctionsQuery, AllAuctionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllAuctionsQuery, AllAuctionsQueryVariables>(AllAuctionsDocument, options);
        }
export type AllAuctionsQueryHookResult = ReturnType<typeof useAllAuctionsQuery>;
export type AllAuctionsLazyQueryHookResult = ReturnType<typeof useAllAuctionsLazyQuery>;
export type AllAuctionsQueryResult = Apollo.QueryResult<AllAuctionsQuery, AllAuctionsQueryVariables>;
export const AuctionsBidAtDocument = gql`
    query AuctionsBidAt {
  auctionsBid {
    auctions {
      id
      title
      description
      seller {
        username
      }
      status
      dateCreated
      dateUpdated
      item {
        id
        picture
        name
      }
      winner {
        username
      }
    }
    count
  }
}
    `;

/**
 * __useAuctionsBidAtQuery__
 *
 * To run a query within a React component, call `useAuctionsBidAtQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuctionsBidAtQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuctionsBidAtQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuctionsBidAtQuery(baseOptions?: Apollo.QueryHookOptions<AuctionsBidAtQuery, AuctionsBidAtQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuctionsBidAtQuery, AuctionsBidAtQueryVariables>(AuctionsBidAtDocument, options);
      }
export function useAuctionsBidAtLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuctionsBidAtQuery, AuctionsBidAtQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuctionsBidAtQuery, AuctionsBidAtQueryVariables>(AuctionsBidAtDocument, options);
        }
export type AuctionsBidAtQueryHookResult = ReturnType<typeof useAuctionsBidAtQuery>;
export type AuctionsBidAtLazyQueryHookResult = ReturnType<typeof useAuctionsBidAtLazyQuery>;
export type AuctionsBidAtQueryResult = Apollo.QueryResult<AuctionsBidAtQuery, AuctionsBidAtQueryVariables>;
export const AuctionsOwnedDocument = gql`
    query AuctionsOwned {
  auctionsOwned {
    auctions {
      id
      title
      description
      seller {
        username
      }
      status
      dateCreated
      dateUpdated
      item {
        id
        picture
        name
      }
      winner {
        username
      }
    }
    count
  }
}
    `;

/**
 * __useAuctionsOwnedQuery__
 *
 * To run a query within a React component, call `useAuctionsOwnedQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuctionsOwnedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuctionsOwnedQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuctionsOwnedQuery(baseOptions?: Apollo.QueryHookOptions<AuctionsOwnedQuery, AuctionsOwnedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuctionsOwnedQuery, AuctionsOwnedQueryVariables>(AuctionsOwnedDocument, options);
      }
export function useAuctionsOwnedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuctionsOwnedQuery, AuctionsOwnedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuctionsOwnedQuery, AuctionsOwnedQueryVariables>(AuctionsOwnedDocument, options);
        }
export type AuctionsOwnedQueryHookResult = ReturnType<typeof useAuctionsOwnedQuery>;
export type AuctionsOwnedLazyQueryHookResult = ReturnType<typeof useAuctionsOwnedLazyQuery>;
export type AuctionsOwnedQueryResult = Apollo.QueryResult<AuctionsOwnedQuery, AuctionsOwnedQueryVariables>;
export const CloseAuctionDocument = gql`
    mutation CloseAuction($auctionId: String!) {
  closeAuction(auctionId: $auctionId) {
    id
    title
    description
    seller {
      username
    }
    status
    dateCreated
    dateUpdated
    item {
      id
      picture
      name
    }
    winner {
      username
    }
  }
}
    `;
export type CloseAuctionMutationFn = Apollo.MutationFunction<CloseAuctionMutation, CloseAuctionMutationVariables>;

/**
 * __useCloseAuctionMutation__
 *
 * To run a mutation, you first call `useCloseAuctionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseAuctionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeAuctionMutation, { data, loading, error }] = useCloseAuctionMutation({
 *   variables: {
 *      auctionId: // value for 'auctionId'
 *   },
 * });
 */
export function useCloseAuctionMutation(baseOptions?: Apollo.MutationHookOptions<CloseAuctionMutation, CloseAuctionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CloseAuctionMutation, CloseAuctionMutationVariables>(CloseAuctionDocument, options);
      }
export type CloseAuctionMutationHookResult = ReturnType<typeof useCloseAuctionMutation>;
export type CloseAuctionMutationResult = Apollo.MutationResult<CloseAuctionMutation>;
export type CloseAuctionMutationOptions = Apollo.BaseMutationOptions<CloseAuctionMutation, CloseAuctionMutationVariables>;
export const CreateAuctionDocument = gql`
    mutation CreateAuction($title: String!, $description: String!, $itemId: Int!) {
  createAuction(title: $title, description: $description, itemId: $itemId) {
    id
    title
    description
    seller {
      username
    }
    status
    dateCreated
    dateUpdated
    item {
      id
      picture
      name
    }
    winner {
      username
    }
  }
}
    `;
export type CreateAuctionMutationFn = Apollo.MutationFunction<CreateAuctionMutation, CreateAuctionMutationVariables>;

/**
 * __useCreateAuctionMutation__
 *
 * To run a mutation, you first call `useCreateAuctionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAuctionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAuctionMutation, { data, loading, error }] = useCreateAuctionMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useCreateAuctionMutation(baseOptions?: Apollo.MutationHookOptions<CreateAuctionMutation, CreateAuctionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAuctionMutation, CreateAuctionMutationVariables>(CreateAuctionDocument, options);
      }
export type CreateAuctionMutationHookResult = ReturnType<typeof useCreateAuctionMutation>;
export type CreateAuctionMutationResult = Apollo.MutationResult<CreateAuctionMutation>;
export type CreateAuctionMutationOptions = Apollo.BaseMutationOptions<CreateAuctionMutation, CreateAuctionMutationVariables>;
export const DeleteAuctionDocument = gql`
    mutation DeleteAuction($auctionId: String!) {
  deleteAuction(auctionId: $auctionId)
}
    `;
export type DeleteAuctionMutationFn = Apollo.MutationFunction<DeleteAuctionMutation, DeleteAuctionMutationVariables>;

/**
 * __useDeleteAuctionMutation__
 *
 * To run a mutation, you first call `useDeleteAuctionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAuctionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAuctionMutation, { data, loading, error }] = useDeleteAuctionMutation({
 *   variables: {
 *      auctionId: // value for 'auctionId'
 *   },
 * });
 */
export function useDeleteAuctionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAuctionMutation, DeleteAuctionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAuctionMutation, DeleteAuctionMutationVariables>(DeleteAuctionDocument, options);
      }
export type DeleteAuctionMutationHookResult = ReturnType<typeof useDeleteAuctionMutation>;
export type DeleteAuctionMutationResult = Apollo.MutationResult<DeleteAuctionMutation>;
export type DeleteAuctionMutationOptions = Apollo.BaseMutationOptions<DeleteAuctionMutation, DeleteAuctionMutationVariables>;
export const EndAuctionDocument = gql`
    mutation EndAuction($auctionId: String!, $winningBidId: Int!) {
  endAuction(auctionId: $auctionId, winningBidId: $winningBidId) {
    id
    title
    description
    seller {
      username
    }
    status
    dateCreated
    dateUpdated
    item {
      id
      picture
      name
    }
    winner {
      username
    }
  }
}
    `;
export type EndAuctionMutationFn = Apollo.MutationFunction<EndAuctionMutation, EndAuctionMutationVariables>;

/**
 * __useEndAuctionMutation__
 *
 * To run a mutation, you first call `useEndAuctionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEndAuctionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [endAuctionMutation, { data, loading, error }] = useEndAuctionMutation({
 *   variables: {
 *      auctionId: // value for 'auctionId'
 *      winningBidId: // value for 'winningBidId'
 *   },
 * });
 */
export function useEndAuctionMutation(baseOptions?: Apollo.MutationHookOptions<EndAuctionMutation, EndAuctionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EndAuctionMutation, EndAuctionMutationVariables>(EndAuctionDocument, options);
      }
export type EndAuctionMutationHookResult = ReturnType<typeof useEndAuctionMutation>;
export type EndAuctionMutationResult = Apollo.MutationResult<EndAuctionMutation>;
export type EndAuctionMutationOptions = Apollo.BaseMutationOptions<EndAuctionMutation, EndAuctionMutationVariables>;
export const GetAuctionDocument = gql`
    query GetAuction($auctionId: String!) {
  getAuction(auctionId: $auctionId) {
    id
    title
    description
    seller {
      username
    }
    status
    dateCreated
    dateUpdated
    item {
      id
      picture
      name
    }
    winner {
      username
    }
    bids {
      id
      item {
        id
        name
        picture
      }
      bidder {
        username
      }
      won
    }
  }
}
    `;

/**
 * __useGetAuctionQuery__
 *
 * To run a query within a React component, call `useGetAuctionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuctionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuctionQuery({
 *   variables: {
 *      auctionId: // value for 'auctionId'
 *   },
 * });
 */
export function useGetAuctionQuery(baseOptions: Apollo.QueryHookOptions<GetAuctionQuery, GetAuctionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAuctionQuery, GetAuctionQueryVariables>(GetAuctionDocument, options);
      }
export function useGetAuctionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuctionQuery, GetAuctionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAuctionQuery, GetAuctionQueryVariables>(GetAuctionDocument, options);
        }
export type GetAuctionQueryHookResult = ReturnType<typeof useGetAuctionQuery>;
export type GetAuctionLazyQueryHookResult = ReturnType<typeof useGetAuctionLazyQuery>;
export type GetAuctionQueryResult = Apollo.QueryResult<GetAuctionQuery, GetAuctionQueryVariables>;
export const ModifyAuctionDocument = gql`
    mutation ModifyAuction($partialUpdate: ModifyAuctionPartialUpdate!, $auctionId: String!) {
  modifyAuction(partialUpdate: $partialUpdate, auctionId: $auctionId) {
    id
    title
    description
    seller {
      username
    }
    status
    dateCreated
    dateUpdated
    item {
      id
      picture
      name
    }
    winner {
      username
    }
  }
}
    `;
export type ModifyAuctionMutationFn = Apollo.MutationFunction<ModifyAuctionMutation, ModifyAuctionMutationVariables>;

/**
 * __useModifyAuctionMutation__
 *
 * To run a mutation, you first call `useModifyAuctionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyAuctionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyAuctionMutation, { data, loading, error }] = useModifyAuctionMutation({
 *   variables: {
 *      partialUpdate: // value for 'partialUpdate'
 *      auctionId: // value for 'auctionId'
 *   },
 * });
 */
export function useModifyAuctionMutation(baseOptions?: Apollo.MutationHookOptions<ModifyAuctionMutation, ModifyAuctionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyAuctionMutation, ModifyAuctionMutationVariables>(ModifyAuctionDocument, options);
      }
export type ModifyAuctionMutationHookResult = ReturnType<typeof useModifyAuctionMutation>;
export type ModifyAuctionMutationResult = Apollo.MutationResult<ModifyAuctionMutation>;
export type ModifyAuctionMutationOptions = Apollo.BaseMutationOptions<ModifyAuctionMutation, ModifyAuctionMutationVariables>;
export const CreateBidDocument = gql`
    mutation CreateBid($itemId: Int!, $auctionId: String!) {
  createBid(itemId: $itemId, auctionId: $auctionId) {
    id
    bidder {
      username
    }
    item {
      id
      picture
      name
    }
    won
  }
}
    `;
export type CreateBidMutationFn = Apollo.MutationFunction<CreateBidMutation, CreateBidMutationVariables>;

/**
 * __useCreateBidMutation__
 *
 * To run a mutation, you first call `useCreateBidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBidMutation, { data, loading, error }] = useCreateBidMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      auctionId: // value for 'auctionId'
 *   },
 * });
 */
export function useCreateBidMutation(baseOptions?: Apollo.MutationHookOptions<CreateBidMutation, CreateBidMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBidMutation, CreateBidMutationVariables>(CreateBidDocument, options);
      }
export type CreateBidMutationHookResult = ReturnType<typeof useCreateBidMutation>;
export type CreateBidMutationResult = Apollo.MutationResult<CreateBidMutation>;
export type CreateBidMutationOptions = Apollo.BaseMutationOptions<CreateBidMutation, CreateBidMutationVariables>;
export const DeleteBidDocument = gql`
    mutation DeleteBid($bidId: Int!) {
  deleteBid(bidId: $bidId)
}
    `;
export type DeleteBidMutationFn = Apollo.MutationFunction<DeleteBidMutation, DeleteBidMutationVariables>;

/**
 * __useDeleteBidMutation__
 *
 * To run a mutation, you first call `useDeleteBidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBidMutation, { data, loading, error }] = useDeleteBidMutation({
 *   variables: {
 *      bidId: // value for 'bidId'
 *   },
 * });
 */
export function useDeleteBidMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBidMutation, DeleteBidMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBidMutation, DeleteBidMutationVariables>(DeleteBidDocument, options);
      }
export type DeleteBidMutationHookResult = ReturnType<typeof useDeleteBidMutation>;
export type DeleteBidMutationResult = Apollo.MutationResult<DeleteBidMutation>;
export type DeleteBidMutationOptions = Apollo.BaseMutationOptions<DeleteBidMutation, DeleteBidMutationVariables>;
export const UserBidsDocument = gql`
    query UserBids {
  getUserBids {
    count
    bids {
      id
      item {
        id
        name
        picture
      }
      bidder {
        username
      }
      auction {
        id
        item {
          picture
        }
      }
      won
    }
  }
}
    `;

/**
 * __useUserBidsQuery__
 *
 * To run a query within a React component, call `useUserBidsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserBidsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserBidsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserBidsQuery(baseOptions?: Apollo.QueryHookOptions<UserBidsQuery, UserBidsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserBidsQuery, UserBidsQueryVariables>(UserBidsDocument, options);
      }
export function useUserBidsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserBidsQuery, UserBidsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserBidsQuery, UserBidsQueryVariables>(UserBidsDocument, options);
        }
export type UserBidsQueryHookResult = ReturnType<typeof useUserBidsQuery>;
export type UserBidsLazyQueryHookResult = ReturnType<typeof useUserBidsLazyQuery>;
export type UserBidsQueryResult = Apollo.QueryResult<UserBidsQuery, UserBidsQueryVariables>;
export const GetBidDocument = gql`
    query GetBid($auctionId: String!) {
  getBid(auctionId: $auctionId) {
    id
    item {
      id
      name
      picture
    }
    bidder {
      username
    }
    auction {
      id
      item {
        picture
      }
    }
    won
  }
}
    `;

/**
 * __useGetBidQuery__
 *
 * To run a query within a React component, call `useGetBidQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBidQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBidQuery({
 *   variables: {
 *      auctionId: // value for 'auctionId'
 *   },
 * });
 */
export function useGetBidQuery(baseOptions: Apollo.QueryHookOptions<GetBidQuery, GetBidQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBidQuery, GetBidQueryVariables>(GetBidDocument, options);
      }
export function useGetBidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBidQuery, GetBidQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBidQuery, GetBidQueryVariables>(GetBidDocument, options);
        }
export type GetBidQueryHookResult = ReturnType<typeof useGetBidQuery>;
export type GetBidLazyQueryHookResult = ReturnType<typeof useGetBidLazyQuery>;
export type GetBidQueryResult = Apollo.QueryResult<GetBidQuery, GetBidQueryVariables>;
export const CreateItemDocument = gql`
    mutation CreateItem($name: String!, $picture: Upload!) {
  createItem(name: $name, picture: $picture) {
    id
    picture
    name
  }
}
    `;
export type CreateItemMutationFn = Apollo.MutationFunction<CreateItemMutation, CreateItemMutationVariables>;

/**
 * __useCreateItemMutation__
 *
 * To run a mutation, you first call `useCreateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createItemMutation, { data, loading, error }] = useCreateItemMutation({
 *   variables: {
 *      name: // value for 'name'
 *      picture: // value for 'picture'
 *   },
 * });
 */
export function useCreateItemMutation(baseOptions?: Apollo.MutationHookOptions<CreateItemMutation, CreateItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument, options);
      }
export type CreateItemMutationHookResult = ReturnType<typeof useCreateItemMutation>;
export type CreateItemMutationResult = Apollo.MutationResult<CreateItemMutation>;
export type CreateItemMutationOptions = Apollo.BaseMutationOptions<CreateItemMutation, CreateItemMutationVariables>;
export const CreateItemWithPictureUrlDocument = gql`
    mutation CreateItemWithPictureUrl($pictureUrl: String!, $name: String!) {
  createItemWithPictureUrl(pictureUrl: $pictureUrl, name: $name) {
    id
    picture
    name
  }
}
    `;
export type CreateItemWithPictureUrlMutationFn = Apollo.MutationFunction<CreateItemWithPictureUrlMutation, CreateItemWithPictureUrlMutationVariables>;

/**
 * __useCreateItemWithPictureUrlMutation__
 *
 * To run a mutation, you first call `useCreateItemWithPictureUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateItemWithPictureUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createItemWithPictureUrlMutation, { data, loading, error }] = useCreateItemWithPictureUrlMutation({
 *   variables: {
 *      pictureUrl: // value for 'pictureUrl'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateItemWithPictureUrlMutation(baseOptions?: Apollo.MutationHookOptions<CreateItemWithPictureUrlMutation, CreateItemWithPictureUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateItemWithPictureUrlMutation, CreateItemWithPictureUrlMutationVariables>(CreateItemWithPictureUrlDocument, options);
      }
export type CreateItemWithPictureUrlMutationHookResult = ReturnType<typeof useCreateItemWithPictureUrlMutation>;
export type CreateItemWithPictureUrlMutationResult = Apollo.MutationResult<CreateItemWithPictureUrlMutation>;
export type CreateItemWithPictureUrlMutationOptions = Apollo.BaseMutationOptions<CreateItemWithPictureUrlMutation, CreateItemWithPictureUrlMutationVariables>;
export const DeleteItemDocument = gql`
    mutation DeleteItem($itemId: Int!) {
  deleteItem(itemId: $itemId)
}
    `;
export type DeleteItemMutationFn = Apollo.MutationFunction<DeleteItemMutation, DeleteItemMutationVariables>;

/**
 * __useDeleteItemMutation__
 *
 * To run a mutation, you first call `useDeleteItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteItemMutation, { data, loading, error }] = useDeleteItemMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useDeleteItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteItemMutation, DeleteItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteItemMutation, DeleteItemMutationVariables>(DeleteItemDocument, options);
      }
export type DeleteItemMutationHookResult = ReturnType<typeof useDeleteItemMutation>;
export type DeleteItemMutationResult = Apollo.MutationResult<DeleteItemMutation>;
export type DeleteItemMutationOptions = Apollo.BaseMutationOptions<DeleteItemMutation, DeleteItemMutationVariables>;
export const ItemsOwnedDocument = gql`
    query ItemsOwned($excludeAuctionedOff: Boolean!) {
  itemsOwned(excludeAuctionedOff: $excludeAuctionedOff) {
    items {
      id
      picture
      name
    }
    count
  }
}
    `;

/**
 * __useItemsOwnedQuery__
 *
 * To run a query within a React component, call `useItemsOwnedQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemsOwnedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemsOwnedQuery({
 *   variables: {
 *      excludeAuctionedOff: // value for 'excludeAuctionedOff'
 *   },
 * });
 */
export function useItemsOwnedQuery(baseOptions: Apollo.QueryHookOptions<ItemsOwnedQuery, ItemsOwnedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ItemsOwnedQuery, ItemsOwnedQueryVariables>(ItemsOwnedDocument, options);
      }
export function useItemsOwnedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ItemsOwnedQuery, ItemsOwnedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ItemsOwnedQuery, ItemsOwnedQueryVariables>(ItemsOwnedDocument, options);
        }
export type ItemsOwnedQueryHookResult = ReturnType<typeof useItemsOwnedQuery>;
export type ItemsOwnedLazyQueryHookResult = ReturnType<typeof useItemsOwnedLazyQuery>;
export type ItemsOwnedQueryResult = Apollo.QueryResult<ItemsOwnedQuery, ItemsOwnedQueryVariables>;
export const ModifyItemDocument = gql`
    mutation ModifyItem($itemId: Int!, $newName: String, $picture: Upload) {
  modifyItem(itemId: $itemId, newName: $newName, picture: $picture) {
    id
    picture
    name
  }
}
    `;
export type ModifyItemMutationFn = Apollo.MutationFunction<ModifyItemMutation, ModifyItemMutationVariables>;

/**
 * __useModifyItemMutation__
 *
 * To run a mutation, you first call `useModifyItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyItemMutation, { data, loading, error }] = useModifyItemMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      newName: // value for 'newName'
 *      picture: // value for 'picture'
 *   },
 * });
 */
export function useModifyItemMutation(baseOptions?: Apollo.MutationHookOptions<ModifyItemMutation, ModifyItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyItemMutation, ModifyItemMutationVariables>(ModifyItemDocument, options);
      }
export type ModifyItemMutationHookResult = ReturnType<typeof useModifyItemMutation>;
export type ModifyItemMutationResult = Apollo.MutationResult<ModifyItemMutation>;
export type ModifyItemMutationOptions = Apollo.BaseMutationOptions<ModifyItemMutation, ModifyItemMutationVariables>;
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
export const DiscordOAuthDocument = gql`
    mutation DiscordOAuth($code: String!) {
  discordOAuth(code: $code) {
    user {
      id
      email
      username
      provider
      avatarUrl
      reputation
      emailPublic
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
      reputation
      emailPublic
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
export const MicrosoftOAuthDocument = gql`
    mutation MicrosoftOAuth($code: String!) {
  microsoftOAuth(code: $code) {
    user {
      id
      email
      username
      provider
      avatarUrl
      reputation
      emailPublic
    }
  }
}
    `;
export type MicrosoftOAuthMutationFn = Apollo.MutationFunction<MicrosoftOAuthMutation, MicrosoftOAuthMutationVariables>;

/**
 * __useMicrosoftOAuthMutation__
 *
 * To run a mutation, you first call `useMicrosoftOAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMicrosoftOAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [microsoftOAuthMutation, { data, loading, error }] = useMicrosoftOAuthMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useMicrosoftOAuthMutation(baseOptions?: Apollo.MutationHookOptions<MicrosoftOAuthMutation, MicrosoftOAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MicrosoftOAuthMutation, MicrosoftOAuthMutationVariables>(MicrosoftOAuthDocument, options);
      }
export type MicrosoftOAuthMutationHookResult = ReturnType<typeof useMicrosoftOAuthMutation>;
export type MicrosoftOAuthMutationResult = Apollo.MutationResult<MicrosoftOAuthMutation>;
export type MicrosoftOAuthMutationOptions = Apollo.BaseMutationOptions<MicrosoftOAuthMutation, MicrosoftOAuthMutationVariables>;
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
    reputation
    emailPublic
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
export const UpdateCredentialsDocument = gql`
    mutation UpdateCredentials($username: String!) {
  updateCredentials(username: $username) {
    id
    email
    username
    provider
    avatarUrl
    reputation
    emailPublic
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
export const UpdateEmailVisibilityDocument = gql`
    mutation UpdateEmailVisibility($newEmailPublic: Boolean!) {
  updateEmailVisibility(newEmailPublic: $newEmailPublic) {
    id
    email
    username
    provider
    avatarUrl
    reputation
    emailPublic
  }
}
    `;
export type UpdateEmailVisibilityMutationFn = Apollo.MutationFunction<UpdateEmailVisibilityMutation, UpdateEmailVisibilityMutationVariables>;

/**
 * __useUpdateEmailVisibilityMutation__
 *
 * To run a mutation, you first call `useUpdateEmailVisibilityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmailVisibilityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmailVisibilityMutation, { data, loading, error }] = useUpdateEmailVisibilityMutation({
 *   variables: {
 *      newEmailPublic: // value for 'newEmailPublic'
 *   },
 * });
 */
export function useUpdateEmailVisibilityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEmailVisibilityMutation, UpdateEmailVisibilityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEmailVisibilityMutation, UpdateEmailVisibilityMutationVariables>(UpdateEmailVisibilityDocument, options);
      }
export type UpdateEmailVisibilityMutationHookResult = ReturnType<typeof useUpdateEmailVisibilityMutation>;
export type UpdateEmailVisibilityMutationResult = Apollo.MutationResult<UpdateEmailVisibilityMutation>;
export type UpdateEmailVisibilityMutationOptions = Apollo.BaseMutationOptions<UpdateEmailVisibilityMutation, UpdateEmailVisibilityMutationVariables>;