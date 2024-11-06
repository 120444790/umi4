
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export const getUserList = async (): Promise<User[]> => {
  const response = await fetch('/api/v1/queryUserList');
  const data = await response.json();
  return data;
};

export const registerUser = async (userData: User): Promise<User> => {
  const response = await fetch('/api/v1/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  return data;
};
