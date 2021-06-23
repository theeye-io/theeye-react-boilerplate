import { createSlice } from "@reduxjs/toolkit";

export type cookie =
    | {
          payload: cookie | undefined;
          email: string;
          token: string;
          credential: string;
      }
    | undefined;

export type profile =
    | {
          payload: profile | undefined;
          id: string;
          customers: [{ name: string; id: string }];
          name: string;
          username: string;
          email: string;
          onboardingCompleted: boolean;
          current_customer: {
              id: string;
              name: string;
              display_name: string;
              config: {
                  elasticsearch: { enabled: boolean; url: string };
                  kibana: { enabled: boolean; url: string };
              };
          };
          notifications: {
              mute: boolean;
              push: boolean;
              email: boolean;
              desktop: boolean;
          };
          credential: string;
          protocol: string;
          member_id: string;
      }
    | undefined;

export const sessionSlice = createSlice({
    name: "session",
    initialState: {
        session: undefined as cookie,
        profile: null as profile,
    },
    reducers: {
        storeLogin: (state, action) => {
            state.session = action.payload;
        },
        storeLogout: (state) => {
            state.session = undefined;
            state.profile = null;
        },
        storeProfile: (state, action) => {
			console.log(action.payload)
            state.profile = action.payload.payload;
        },
    },
});

export const { storeLogin, storeLogout, storeProfile } = sessionSlice.actions;

export default sessionSlice.reducer;
