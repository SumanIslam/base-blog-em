export interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export interface Comment {
  id: number;
  email: string;
  body: string;
}