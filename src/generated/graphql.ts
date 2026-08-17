import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Iterable: { input: any; output: any; }
};

export enum AllEntityTypeEnum {
  Comment = 'COMMENT',
  Post = 'POST',
  User = 'USER'
}

export type Comment = Node & {
  __typename?: 'Comment';
  author: User;
  entity_id: Scalars['String']['output'];
  entity_type: AllEntityTypeEnum;
  id: Scalars['ID']['output'];
  parent?: Maybe<Comment>;
  string_id: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

/** Cursor connection for Comment. */
export type CommentCursorConnection = {
  __typename?: 'CommentCursorConnection';
  edges?: Maybe<Array<Maybe<CommentEdge>>>;
  pageInfo: CommentPageInfo;
  totalCount: Scalars['Int']['output'];
};

/** Edge of Comment. */
export type CommentEdge = {
  __typename?: 'CommentEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Comment>;
};

/** Information about the current page. */
export type CommentPageInfo = {
  __typename?: 'CommentPageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type KanbanColumn = Node & {
  __typename?: 'KanbanColumn';
  color?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  position: Scalars['Int']['output'];
  project: Project;
  string_id: Scalars['String']['output'];
  tasks?: Maybe<TaskCursorConnection>;
};


export type KanbanColumnTasksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  project?: InputMaybe<Scalars['String']['input']>;
  project_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<Scalars['String']['input']>;
  status_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Cursor connection for KanbanColumn. */
export type KanbanColumnCursorConnection = {
  __typename?: 'KanbanColumnCursorConnection';
  edges?: Maybe<Array<Maybe<KanbanColumnEdge>>>;
  pageInfo: KanbanColumnPageInfo;
  totalCount: Scalars['Int']['output'];
};

/** Edge of KanbanColumn. */
export type KanbanColumnEdge = {
  __typename?: 'KanbanColumnEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<KanbanColumn>;
};

/** Information about the current page. */
export type KanbanColumnPageInfo = {
  __typename?: 'KanbanColumnPageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a Comment. */
  createComment?: Maybe<CreateCommentPayload>;
  /** Creates a KanbanColumn. */
  createKanbanColumn?: Maybe<CreateKanbanColumnPayload>;
  /** Creates a Notification. */
  createNotification?: Maybe<CreateNotificationPayload>;
  /** Creates a Project. */
  createProject?: Maybe<CreateProjectPayload>;
  /** Creates a ProjectUser. */
  createProjectUser?: Maybe<CreateProjectUserPayload>;
  /** Creates a Task. */
  createTask?: Maybe<CreateTaskPayload>;
  /** Deletes a Comment. */
  deleteComment?: Maybe<DeleteCommentPayload>;
  /** Deletes a KanbanColumn. */
  deleteKanbanColumn?: Maybe<DeleteKanbanColumnPayload>;
  /** Deletes a Notification. */
  deleteNotification?: Maybe<DeleteNotificationPayload>;
  /** Deletes a Project. */
  deleteProject?: Maybe<DeleteProjectPayload>;
  /** Deletes a ProjectUser. */
  deleteProjectUser?: Maybe<DeleteProjectUserPayload>;
  /** Deletes a Task. */
  deleteTask?: Maybe<DeleteTaskPayload>;
  /** Updates a Comment. */
  updateComment?: Maybe<UpdateCommentPayload>;
  /** Updates a KanbanColumn. */
  updateKanbanColumn?: Maybe<UpdateKanbanColumnPayload>;
  /** Updates a Notification. */
  updateNotification?: Maybe<UpdateNotificationPayload>;
  /** Updates a Project. */
  updateProject?: Maybe<UpdateProjectPayload>;
  /** Updates a ProjectUser. */
  updateProjectUser?: Maybe<UpdateProjectUserPayload>;
  /** Updates a Task. */
  updateTask?: Maybe<UpdateTaskPayload>;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreateKanbanColumnArgs = {
  input: CreateKanbanColumnInput;
};


export type MutationCreateNotificationArgs = {
  input: CreateNotificationInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateProjectUserArgs = {
  input: CreateProjectUserInput;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationDeleteCommentArgs = {
  input: DeleteCommentInput;
};


export type MutationDeleteKanbanColumnArgs = {
  input: DeleteKanbanColumnInput;
};


export type MutationDeleteNotificationArgs = {
  input: DeleteNotificationInput;
};


export type MutationDeleteProjectArgs = {
  input: DeleteProjectInput;
};


export type MutationDeleteProjectUserArgs = {
  input: DeleteProjectUserInput;
};


export type MutationDeleteTaskArgs = {
  input: DeleteTaskInput;
};


export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


export type MutationUpdateKanbanColumnArgs = {
  input: UpdateKanbanColumnInput;
};


export type MutationUpdateNotificationArgs = {
  input: UpdateNotificationInput;
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


export type MutationUpdateProjectUserArgs = {
  input: UpdateProjectUserInput;
};


export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
};

/** A node, according to the Relay specification. */
export type Node = {
  /** The id of this node. */
  id: Scalars['ID']['output'];
};

export type Notification = Node & {
  __typename?: 'Notification';
  id: Scalars['ID']['output'];
  read?: Maybe<Scalars['Boolean']['output']>;
  string_id: Scalars['String']['output'];
  text: Scalars['String']['output'];
  type: Scalars['String']['output'];
  user: User;
};

/** Cursor connection for Notification. */
export type NotificationCursorConnection = {
  __typename?: 'NotificationCursorConnection';
  edges?: Maybe<Array<Maybe<NotificationEdge>>>;
  pageInfo: NotificationPageInfo;
  totalCount: Scalars['Int']['output'];
};

/** Edge of Notification. */
export type NotificationEdge = {
  __typename?: 'NotificationEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Notification>;
};

/** Information about the current page. */
export type NotificationPageInfo = {
  __typename?: 'NotificationPageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Project = Node & {
  __typename?: 'Project';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  kanban_columns?: Maybe<KanbanColumnCursorConnection>;
  name: Scalars['String']['output'];
  project_users?: Maybe<ProjectUserCursorConnection>;
  string_id: Scalars['String']['output'];
  tag?: Maybe<Scalars['String']['output']>;
};


export type ProjectKanban_ColumnsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type ProjectProject_UsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** Cursor connection for Project. */
export type ProjectCursorConnection = {
  __typename?: 'ProjectCursorConnection';
  edges?: Maybe<Array<Maybe<ProjectEdge>>>;
  pageInfo: ProjectPageInfo;
  totalCount: Scalars['Int']['output'];
};

/** Edge of Project. */
export type ProjectEdge = {
  __typename?: 'ProjectEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Project>;
};

/** Information about the current page. */
export type ProjectPageInfo = {
  __typename?: 'ProjectPageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type ProjectUser = Node & {
  __typename?: 'ProjectUser';
  id: Scalars['ID']['output'];
  project: Project;
  role: RoleEnum;
  string_id: Scalars['String']['output'];
  user: User;
};

/** Cursor connection for ProjectUser. */
export type ProjectUserCursorConnection = {
  __typename?: 'ProjectUserCursorConnection';
  edges?: Maybe<Array<Maybe<ProjectUserEdge>>>;
  pageInfo: ProjectUserPageInfo;
  totalCount: Scalars['Int']['output'];
};

/** Edge of ProjectUser. */
export type ProjectUserEdge = {
  __typename?: 'ProjectUserEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<ProjectUser>;
};

/** Information about the current page. */
export type ProjectUserPageInfo = {
  __typename?: 'ProjectUserPageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  comment?: Maybe<Comment>;
  comments?: Maybe<CommentCursorConnection>;
  kanbanColumn?: Maybe<KanbanColumn>;
  kanbanColumns?: Maybe<KanbanColumnCursorConnection>;
  meUser?: Maybe<User>;
  node?: Maybe<Node>;
  notification?: Maybe<Notification>;
  notifications?: Maybe<NotificationCursorConnection>;
  project?: Maybe<Project>;
  projectUser?: Maybe<ProjectUser>;
  projectUsers?: Maybe<ProjectUserCursorConnection>;
  projects?: Maybe<ProjectCursorConnection>;
  task?: Maybe<Task>;
  tasks?: Maybe<TaskCursorConnection>;
  user?: Maybe<User>;
};


export type QueryCommentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCommentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryKanbanColumnArgs = {
  id: Scalars['ID']['input'];
};


export type QueryKanbanColumnsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNotificationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProjectArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProjectUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProjectUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryProjectsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTaskArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTasksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  project?: InputMaybe<Scalars['String']['input']>;
  project_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<Scalars['String']['input']>;
  status_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export enum RoleEnum {
  RoleOwner = 'ROLE_OWNER'
}

export type Task = Node & {
  __typename?: 'Task';
  assigned_to?: Maybe<User>;
  comments?: Maybe<CommentCursorConnection>;
  deadline?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  kanban_column?: Maybe<KanbanColumn>;
  parent?: Maybe<Task>;
  priority: Scalars['Int']['output'];
  project?: Maybe<Project>;
  status: TaskStatusEnum;
  story_points?: Maybe<Scalars['Int']['output']>;
  string_id: Scalars['String']['output'];
  title: Scalars['String']['output'];
};


export type TaskCommentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** Cursor connection for Task. */
export type TaskCursorConnection = {
  __typename?: 'TaskCursorConnection';
  edges?: Maybe<Array<Maybe<TaskEdge>>>;
  pageInfo: TaskPageInfo;
  totalCount: Scalars['Int']['output'];
};

/** Edge of Task. */
export type TaskEdge = {
  __typename?: 'TaskEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Task>;
};

/** Information about the current page. */
export type TaskPageInfo = {
  __typename?: 'TaskPageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export enum TaskStatusEnum {
  Done = 'DONE',
  New = 'NEW'
}

export type User = Node & {
  __typename?: 'User';
  avatar_url?: Maybe<Scalars['String']['output']>;
  content?: Maybe<CommentCursorConnection>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  notifications?: Maybe<NotificationCursorConnection>;
  password: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  project_users?: Maybe<ProjectUserCursorConnection>;
  roles: Scalars['Iterable']['output'];
  string_id: Scalars['String']['output'];
  telegram?: Maybe<Scalars['String']['output']>;
  timezone?: Maybe<Scalars['String']['output']>;
  user_identifier: Scalars['String']['output'];
};


export type UserContentArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type UserNotificationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type UserProject_UsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

/** Creates a Comment. */
export type CreateCommentInput = {
  author: Scalars['String']['input'];
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  entity_id: Scalars['String']['input'];
  entity_type: AllEntityTypeEnum;
  parent?: InputMaybe<Scalars['String']['input']>;
  text: Scalars['String']['input'];
};

/** Creates a Comment. */
export type CreateCommentPayload = {
  __typename?: 'createCommentPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Comment>;
};

/** Creates a KanbanColumn. */
export type CreateKanbanColumnInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  position: Scalars['Int']['input'];
  project: Scalars['String']['input'];
  tasks?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Creates a KanbanColumn. */
export type CreateKanbanColumnPayload = {
  __typename?: 'createKanbanColumnPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  kanbanColumn?: Maybe<KanbanColumn>;
};

/** Creates a Notification. */
export type CreateNotificationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  is_read: Scalars['Boolean']['input'];
  text: Scalars['String']['input'];
  type: Scalars['String']['input'];
  user: Scalars['String']['input'];
};

/** Creates a Notification. */
export type CreateNotificationPayload = {
  __typename?: 'createNotificationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  notification?: Maybe<Notification>;
};

/** Creates a Project. */
export type CreateProjectInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  kanban_columns?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name: Scalars['String']['input'];
  project_users?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tag?: InputMaybe<Scalars['String']['input']>;
};

/** Creates a Project. */
export type CreateProjectPayload = {
  __typename?: 'createProjectPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Project>;
};

/** Creates a ProjectUser. */
export type CreateProjectUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  project: Scalars['String']['input'];
  role: RoleEnum;
  user: Scalars['String']['input'];
};

/** Creates a ProjectUser. */
export type CreateProjectUserPayload = {
  __typename?: 'createProjectUserPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  projectUser?: Maybe<ProjectUser>;
};

/** Creates a Task. */
export type CreateTaskInput = {
  assigned_to?: InputMaybe<Scalars['String']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  comments?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  deadline?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  kanban_column?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Scalars['String']['input']>;
  priority: Scalars['Int']['input'];
  project?: InputMaybe<Scalars['String']['input']>;
  status: TaskStatusEnum;
  story_points?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};

/** Creates a Task. */
export type CreateTaskPayload = {
  __typename?: 'createTaskPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  task?: Maybe<Task>;
};

/** Deletes a Comment. */
export type DeleteCommentInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

/** Deletes a Comment. */
export type DeleteCommentPayload = {
  __typename?: 'deleteCommentPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Comment>;
};

/** Deletes a KanbanColumn. */
export type DeleteKanbanColumnInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

/** Deletes a KanbanColumn. */
export type DeleteKanbanColumnPayload = {
  __typename?: 'deleteKanbanColumnPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  kanbanColumn?: Maybe<KanbanColumn>;
};

/** Deletes a Notification. */
export type DeleteNotificationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

/** Deletes a Notification. */
export type DeleteNotificationPayload = {
  __typename?: 'deleteNotificationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  notification?: Maybe<Notification>;
};

/** Deletes a Project. */
export type DeleteProjectInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

/** Deletes a Project. */
export type DeleteProjectPayload = {
  __typename?: 'deleteProjectPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Project>;
};

/** Deletes a ProjectUser. */
export type DeleteProjectUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

/** Deletes a ProjectUser. */
export type DeleteProjectUserPayload = {
  __typename?: 'deleteProjectUserPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  projectUser?: Maybe<ProjectUser>;
};

/** Deletes a Task. */
export type DeleteTaskInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

/** Deletes a Task. */
export type DeleteTaskPayload = {
  __typename?: 'deleteTaskPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  task?: Maybe<Task>;
};

/** Updates a Comment. */
export type UpdateCommentInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  entity_id?: InputMaybe<Scalars['String']['input']>;
  entity_type?: InputMaybe<AllEntityTypeEnum>;
  id: Scalars['ID']['input'];
  parent?: InputMaybe<Scalars['String']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
};

/** Updates a Comment. */
export type UpdateCommentPayload = {
  __typename?: 'updateCommentPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Comment>;
};

/** Updates a KanbanColumn. */
export type UpdateKanbanColumnInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  project?: InputMaybe<Scalars['String']['input']>;
  tasks?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Updates a KanbanColumn. */
export type UpdateKanbanColumnPayload = {
  __typename?: 'updateKanbanColumnPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  kanbanColumn?: Maybe<KanbanColumn>;
};

/** Updates a Notification. */
export type UpdateNotificationInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  is_read?: InputMaybe<Scalars['Boolean']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
};

/** Updates a Notification. */
export type UpdateNotificationPayload = {
  __typename?: 'updateNotificationPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  notification?: Maybe<Notification>;
};

/** Updates a Project. */
export type UpdateProjectInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  kanban_columns?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  project_users?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tag?: InputMaybe<Scalars['String']['input']>;
};

/** Updates a Project. */
export type UpdateProjectPayload = {
  __typename?: 'updateProjectPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Project>;
};

/** Updates a ProjectUser. */
export type UpdateProjectUserInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  project?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<RoleEnum>;
  user?: InputMaybe<Scalars['String']['input']>;
};

/** Updates a ProjectUser. */
export type UpdateProjectUserPayload = {
  __typename?: 'updateProjectUserPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  projectUser?: Maybe<ProjectUser>;
};

/** Updates a Task. */
export type UpdateTaskInput = {
  assigned_to?: InputMaybe<Scalars['String']['input']>;
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  comments?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  deadline?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  kanban_column?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  project?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<TaskStatusEnum>;
  story_points?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Updates a Task. */
export type UpdateTaskPayload = {
  __typename?: 'updateTaskPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  task?: Maybe<Task>;
};


export const ProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProjectsQuery, ProjectsQueryVariables>;
export const CreateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"createProjectInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const UpdateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"updateProjectInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const DeleteProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"deleteProjectInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const CreateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"createTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"assigned_to"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateTaskMutation, CreateTaskMutationVariables>;
export const TasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Tasks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"project"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status_list"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tasks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"project"},"value":{"kind":"Variable","name":{"kind":"Name","value":"project"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"status_list"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status_list"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<TasksQuery, TasksQueryVariables>;
export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectCursorConnection', edges?: Array<{ __typename?: 'ProjectEdge', node?: { __typename?: 'Project', id: string, name: string, tag?: string | null, description?: string | null } | null } | null> | null } | null };

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject?: { __typename?: 'createProjectPayload', project?: { __typename?: 'Project', id: string, name: string, tag?: string | null, description?: string | null } | null } | null };

export type UpdateProjectMutationVariables = Exact<{
  input: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject?: { __typename?: 'updateProjectPayload', project?: { __typename?: 'Project', id: string, name: string, tag?: string | null, description?: string | null } | null } | null };

export type DeleteProjectMutationVariables = Exact<{
  input: DeleteProjectInput;
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject?: { __typename?: 'deleteProjectPayload', project?: { __typename?: 'Project', id: string } | null } | null };

export type CreateTaskMutationVariables = Exact<{
  input: CreateTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask?: { __typename?: 'createTaskPayload', task?: { __typename?: 'Task', id: string, title: string, status: TaskStatusEnum, description?: string | null, assigned_to?: { __typename?: 'User', id: string, email: string } | null, project?: { __typename?: 'Project', id: string, name: string } | null } | null } | null };

export type TasksQueryVariables = Exact<{
  project: Scalars['String']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
  status_list?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type TasksQuery = { __typename?: 'Query', tasks?: { __typename?: 'TaskCursorConnection', edges?: Array<{ __typename?: 'TaskEdge', node?: { __typename?: 'Task', id: string, title: string, description?: string | null, status: TaskStatusEnum, priority: number, project?: { __typename?: 'Project', id: string } | null } | null } | null> | null } | null };
