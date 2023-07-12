import axios from 'axios';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization:
      'Bearer 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',
  },
});
