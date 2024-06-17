import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import Container from "../components/Container";
import { useDispatch } from "react-redux";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../Features/usersApiSlice";
import { useState } from "react";
import { setCredentials } from "../Features/authSlice";
import { useToast } from "../components/ui/use-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [register, { isLoading: registerLoading, error: registerError }] =
    useRegisterMutation();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
        toast({
          title: "Register Success!",
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Login Failed!",
          description: registerError,
          variant: "destructive",
        });
      }
    } else {
      console.log("Passwords do not match");
      toast({
        title: "Passwords do not match!",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex flex-col w-full justify-center min-h-[63vh]">
      <Container>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Register</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="grid gap-4"
              onSubmit={(e) => handleRegisterSubmit(e)}
            >
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Max"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
              <Button variant="outline" className="w-full">
                Sign up with GitHub
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="#" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
