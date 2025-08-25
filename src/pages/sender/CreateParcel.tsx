import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useAllReceiversQuery, useMeQuery } from "@/redux/features/auth.api";
import { useCreateParcelMutation } from "@/redux/features/parcels/parcel.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";
import { useEffect } from "react";

// ✅ Zod Schema
const formSchema = z.object({
  parcelType: z.string().min(1, "Parcel type is required"),
  weight: z.number().positive("Weight must be a positive number"),
  deliveryFee: z.number().min(50, "Delivery fee must be at least 50"),
  deliveryAddress: z.string().min(1, "Delivery address is required"),
  deliveryDate: z.date().refine((date) => !!date, {
    message: "Delivery date is required",
  }),
  senderInfo: z.string().min(1, "Sender info is required"),
  receiverInfo: z.string().min(1, "Receiver info is required"),
});

const CreateParcel = () => {
  const { data: receivers, isLoading } = useAllReceiversQuery(undefined);
  const { data: sender } = useMeQuery(undefined);
  const [createParcel, { isLoading: isSubmitting }] = useCreateParcelMutation();

  console.log(sender?.data?._id)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parcelType: "",
      weight: Number("1"),
      deliveryFee: Number("50"),
      deliveryAddress: "",
      deliveryDate: undefined,
      senderInfo: sender?.data?._id || "",
      receiverInfo: "",
    },
  });

  // ✅ Handle form submit
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await createParcel(data).unwrap();

      console.log(res)
      toast.success("Parcel created successfully ✅");
      // form.reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create parcel ❌");
    }
  };


  useEffect(() => {
    if (sender?.data?._id) {
      form.reset({
        ...form.getValues(),   // keep existing form values
        senderInfo: sender.data._id,  // update senderInfo
      });
    }
  }, [sender, form]);

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Create Parcel</CardTitle>
            <CardDescription>
              Fill in the details to create a new parcel request
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                {/* Parcel Type + Weight */}
                <div className="md:flex gap-4 w-full space-y-4 md:space-y-0">
                  <FormField
                    control={form.control}
                    name="parcelType"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Parcel Type</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Books, Electronics, Clothes..."
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Weight (kg)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="1.0"
                            type="number"
                            step="0.1"
                            {...field}
                            value={field.value ?? 0}
                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Delivery Fee + Date */}
                <div className="md:flex gap-4 w-full space-y-4 md:space-y-0">
                  <FormField
                    control={form.control}
                    name="deliveryFee"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Delivery Fee</FormLabel>
                        <FormControl>
                          <Input placeholder="50" type="number" {...field} value={field.value ?? 50}            value={field.value ?? 50}
          onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deliveryDate"
                    render={({ field }) => (
                      <FormItem className="w-full flex flex-col">
                        <FormLabel>Delivery Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(new Date().setDate(new Date().getDate() - 1))
                              }
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Sender (Auto-filled) */}
                <FormField
                  control={form.control}
                  name="senderInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sender ID</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          readOnly

                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Receiver Select */}
                <FormField
                  control={form.control}
                  name="receiverInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receiver</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full border rounded px-3 py-2 text-white bg-[#080C23]"
                        >
                          <option value="">Select a Receiver</option>
                          {!isLoading &&
                            receivers?.data?.map((r: { _id: string, name: string, email: string }) => (
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

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#172572] text-white font-semibold rounded-full py-2 text-base"
                >
                  {isSubmitting ? "Creating..." : "Create Parcel"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateParcel;

/**
 * 
 * [
  {
    "_id": "pcl_001",
    "parcelType": "Electronics",
    "weight": "2.5",
    "deliveryFee": "120",
    "deliveryAddress": "Dhaka University, Dhaka",
    "senderInfo": "user_101",
    "receiverInfo": "user_201",
    "deliveryDate": "2025-08-30"
  },
  {
    "_id": "pcl_002",
    "parcelType": "Books",
    "weight": "1.2",
    "deliveryFee": "80",
    "deliveryAddress": "Chattogram Town, Chattogram",
    "senderInfo": "user_102",
    "receiverInfo": "user_202",
    "deliveryDate": "2025-09-02"
  },
  {
    "_id": "pcl_003",
    "parcelType": "Clothes",
    "weight": "3.0",
    "deliveryFee": "150",
    "deliveryAddress": "Rajshahi College, Rajshahi",
    "senderInfo": "user_103",
    "receiverInfo": "user_203",
    "deliveryDate": "2025-09-05"
  },
  {
    "_id": "pcl_004",
    "parcelType": "Documents",
    "weight": "0.5",
    "deliveryFee": "60",
    "deliveryAddress": "Sylhet Polytechnic, Sylhet",
    "senderInfo": "user_104",
    "receiverInfo": "user_204",
    "deliveryDate": "2025-09-01"
  },
  {
    "_id": "pcl_005",
    "parcelType": "Home Appliances",
    "weight": "5.8",
    "deliveryFee": "200",
    "deliveryAddress": "Khulna Engineering University, Khulna",
    "senderInfo": "user_105",
    "receiverInfo": "user_205",
    "deliveryDate": "2025-09-10"
  }
]
 */
