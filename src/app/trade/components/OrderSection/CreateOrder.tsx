"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function CreateOrder() {
  // style={{ background: 'linear-gradient(to bottom right, #280315, #041c34)' }}
  return (
    <Card style={{ background: 'linear-gradient(to bottom right, #280315, #041c34)' }} className="col-span-2">
      <CardHeader>
        <CardTitle className="text-2xl">Swap</CardTitle>
        <CardDescription>ETH-USDC</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2 mb-4 w-[160px]">
          <Label htmlFor="subject">Balance</Label>
          <Input disabled id="subject" placeholder="I need help with..." />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="area">Token</Label>
            <Select defaultValue="inr">
              <SelectTrigger className="w-[160px] bg-background" id="area">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">INR</SelectItem>
                <SelectItem value="SGB">SGB</SelectItem>
                <SelectItem value="account">Account</SelectItem>
                <SelectItem value="deployments">Deployments</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="security-level">Amount</Label>
            <Input id="subject" placeholder="I need help with..." />
          </div>
        </div>

        <div className='grid place-items-center -m-6'>
          <SwapIcon />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="area">Token</Label>
            <Select defaultValue="inr">
              <SelectTrigger className="w-[160px] bg-background" id="area">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">INR</SelectItem>
                <SelectItem value="SGB">SGB</SelectItem>
                <SelectItem value="account">Account</SelectItem>
                <SelectItem value="deployments">Deployments</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="security-level">Amount</Label>
            <Input disabled id="subject" placeholder="I need help with..." />
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between mt-6 space-x-2">
        <Button style={{background:"#bd9fe4"}} className="w-full">Submit</Button>
      </CardFooter>
    </Card>
  )
}

const SwapIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-up"><path d="m3 16 4 4 4-4" /><path d="M7 20V4" /><path d="m21 8-4-4-4 4" /><path d="M17 4v16" /></svg>
  )
}
