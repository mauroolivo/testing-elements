const axios = {
  get: jest.fn(),
  __setMockResponse(data: unknown) {
    (axios.get as jest.Mock).mockResolvedValue({ data });
  },
  __setMockError(error: unknown) {
    (axios.get as jest.Mock).mockRejectedValue(error);
  },
  __reset() {
    (axios.get as jest.Mock).mockReset();
  },
};

export default axios;
export const __setMockResponse = axios.__setMockResponse;
export const __setMockError = axios.__setMockError;
export const __reset = axios.__reset;