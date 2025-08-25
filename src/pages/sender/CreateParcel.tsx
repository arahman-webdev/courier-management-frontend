import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAllReceiversQuery } from "@/redux/features/auth.api";
import { useForm, Controller } from "react-hook-form";

const CreateParcel = () => {
  const { data: receivers, isLoading } = useAllReceiversQuery(undefined);
  const form = useForm();

  const onSubmit = async (data: any) => {
    console.log("Parcel form data:", data);
    // Call your API mutation here
  };

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create Parcel</CardTitle>
          <CardDescription>
            Fill in the details to create a new parcel request
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                {/* Parcel Type */}
                <FormField
                  control={form.control}
                  name="parcelType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parcel Type</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Books, Electronics, Clothes..."
                          type="text"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Weight */}
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1.0"
                          type="number"
                          step="0.1"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Delivery Fee */}
                <FormField
                  control={form.control}
                  name="deliveryFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Fee</FormLabel>
                      <FormControl>
                        <Input placeholder="50" type="number" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Delivery Date */}
                <FormField
                  control={form.control}
                  name="deliveryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Date</FormLabel>
                      <FormControl>
                        <Input type="date" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Delivery Address */}
                <FormField
                  control={form.control}
                  name="deliveryAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Chattogram University, Chattogram"
                          type="text"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Sender ID (auto-fill if you have auth) */}
                <FormField
                  control={form.control}
                  name="senderInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sender ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Sender ID"
                          type="text"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Receiver select */}
                <FormField
                  control={form.control}
                  name="receiverInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receiver</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          required
                          className="w-full border rounded px-3 py-2 text-white bg-[#080C23]"
                        >
                          <option value="">Select a Receiver</option>
                          {!isLoading &&
                            receivers?.data?.map((r: any) => (
                              <option key={r._id} value={r._id}>
                                {r.name} ({r.email})
                              </option>
                            ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-[#172572] text-white font-semibold rounded-full py-2 text-base"
                >
                  Create Parcel
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateParcel;
