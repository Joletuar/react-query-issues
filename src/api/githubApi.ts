import axios from 'axios';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization: 'Bearer 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',
  },
});
