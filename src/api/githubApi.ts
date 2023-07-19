import axios from 'axios';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization:
      'Bearer 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',
  },
});
