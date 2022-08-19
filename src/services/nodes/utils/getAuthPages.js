const getAuthPages = () => [
  {
    module: "sign-in",
    path: `sign-in`,
    componentPath: `./src/components/Auth/Auth.js`,
    formModule: "Auth",
    context: {
      nextPath: `/registration`,
      backPath: `/`,
      module: {
        name: "sign-in",
        cta: "Sign In",
        title: `Welcome Back`,
        subtitle: `Please sign in to continue.`,
        seoTitle: "Sign In",
      },
    },
  },
  {
    module: "forgot-password",
    path: `forgot-password`,
    componentPath: `./src/components/Auth/Auth.js`,
    formModule: "Auth",
    context: {
      nextPath: `/`,
      backPath: `/`,
      module: {
        name: "forgot-password",
        cta: "Reset Password",
        title: `Forgot Password`,
        subtitle: `Provide your email address to reset your password.`,
        seoTitle: "Forgot Password",
      },
    },
  },
  {
    module: "verify-email",
    path: `verify-email`,
    componentPath: `./src/components/Auth/Auth.js`,
    formModule: "Auth",
    context: {
      nextPath: `/`,
      backPath: `/`,
      module: {
        name: "verify-email",
        cta: "Next",
        title: `Register Now`,
        subtitle: `Enter your email to get started.`,
        seoTitle: "Verify Email",
      },
    },
  },
  {
    module: "sign-up",
    path: `sign-up`,
    componentPath: `./src/components/Auth/Auth.js`,
    formModule: "Auth",
    context: {
      nextPath: `/`,
      backPath: `/`,
      module: {
        name: "sign-up",
        cta: "Sign Up",
        title: `Sign Up`,
        subtitle: `Please create an account before registering for your organization.`,
        seoTitle: "Sign Up",
      },
    },
  },
]

module.exports = { getAuthPages }
