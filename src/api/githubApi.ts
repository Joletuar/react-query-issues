import axios from 'axios';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization:
      'Bearer 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',
  },
});
