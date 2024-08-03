import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
const useUpdateUserProfile = () => {
    const queryClient = useQueryClient()
    const { mutateAsync: updateProfile, isPending: isUpdatingProfile } = useMutation({
        mutationFn: async (formData) => {
          try {
            const res = await fetch("/api/users/update", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });
            const result = await res.json();
            if (!res.ok) {
              throw new Error(result.error || "Something went wrong");
            }
            return result;
          } catch (error) {
            throw new Error(error.message);
          }
        },
        onSuccess: () => {
          toast.success("Profile updated successfully");
          queryClient.invalidateQueries({ queryKey: ["authUser"] });
          queryClient.invalidateQueries({ queryKey: ["userProfile"] });
        },
        onError: () => {
          toast.error("something went wrong");
        },
      });
      return {updateProfile , isUpdatingProfile}
}

export default useUpdateUserProfile;