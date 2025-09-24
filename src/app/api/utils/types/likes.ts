
export type getLikesRequest = {
  id: number;
}

export type getLikesResponse = {
  status: number;
  message: string;
  data: {
    like: number;
    dislike: number;
    upd_time: string;
  }
}

export type postLikesRequest = {
  id: number;
  type: 'like' | 'dislike';
}

export type postLikesResponse = {
  status: number;
  message: string;
}
