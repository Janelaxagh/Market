import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { FC } from "react";
import AuthController from "../../../controllers/AuthController";
import { displayErrorToast } from "../../atoms";

const googleClientId =
  "207861578408-kstr5g00ce40gc8jei84qoq6jddv4909.apps.googleusercontent.com";

export const GoogleAuthOrgamism: FC = () => {
  const handleGoogleAuthSuccess = async (credentialResponse: any) => {
    try {
      const googleData = jwt_decode(credentialResponse.credential ?? "");
      // console.log(googleData);

      await AuthController.googleAuth(googleData);
    } catch (error) {
      // console.error("Ошибка", error);
      displayErrorToast("Произошла ошибка входа через Google");
    }
  };

  return (
    <div className="mt-8">
      <GoogleOAuthProvider clientId={googleClientId}>
        <GoogleLogin
          theme="outline"
          size="large"
          shape="rectangular"
          width="357px"
          onSuccess={handleGoogleAuthSuccess}
          onError={() => {
            displayErrorToast("Произошла ошибка входа через Google");
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
};
