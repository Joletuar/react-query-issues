import axios from 'axios';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization:
      'Bearer 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',
  },
});
