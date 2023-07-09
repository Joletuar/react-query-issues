import axios from 'axios';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization:
      'Bearer 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',
  },
});
