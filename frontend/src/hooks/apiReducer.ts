type ApiState = {
  message: string;
  data: object | null;
  isLoading: boolean;
  error: string;
};

type ApiAction =
  | { type: "LOADING" }
  | { type: "SUCCESS"; payload: { data: object; message: string } }
  | { type: "ERROR"; payload: string }
  | { type: "RESET" };

export const initialState: ApiState = {
  message: "",
  data: null,
  isLoading: false,
  error: "",
};

export function apiReducer(state: ApiState, action: ApiAction): ApiState {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true, error: "" };
    case "SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        message: action.payload.message,
        error: "",
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}
