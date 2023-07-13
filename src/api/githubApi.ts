import axios from 'axios';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization:
      'Bearer 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',
  },
});
