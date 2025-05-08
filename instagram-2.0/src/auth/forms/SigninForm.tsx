import Loader from "@/components/shared/Loader"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
// import { createUserAccount } from "@/lib/appwrite/api"
import { SigninValidation } from "@/lib/formValidation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"
import { toast } from "sonner"
import { useSignInAccount } from "@/lib/react-query/queries"
import { useAuthContext } from "@/context/AuthContext"



function SigninForm() {
  const navigate = useNavigate()
  const { checkAuthUser, isLoading: isUserLoading } = useAuthContext()

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password
    });

    if (!session) {
      toast("Sign in failed. Please try again...")
      navigate("/sign-in")

      return;
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset()
      navigate("/")
    } else {
      return toast("Login Faled. Please try again.")
    }

  }
  return (
    <Form {...form}>
      <div className="sm:w-100 flex-center flex-col pl-1.5 pr-1.5">
        <img src="/assets/images/logo.svg" />

        <h2 className="h3-bold md:h2-bold pt-4 sm:pt-5">Log in to your account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-1">Welcome Back! please enter your account details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full mt-4">

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="h-11 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="h-11 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary py-6 mt-2 cursor-pointer" >
            {isSigningInUser || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : ("Sign In")}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?
            <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1 hover:underline transition-all duration-75">Sign Up</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SigninForm
