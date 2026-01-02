"use client";

import { Field, FieldGroup, FieldLabel } from "../ui/field";

import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const CreatePackingList = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create your trip</CardTitle>
        <CardDescription>
          Please fill in your trip details below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="small-form-name">Trip name</FieldLabel>
                <Input
                  id="small-form-name"
                  placeholder="My Trip to Japan"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="small-form-allowance">
                  Airline Carry-on allowance (kg)
                </FieldLabel>
                <Input
                  type="number"
                  id="small-form-allowance"
                  placeholder="7 kg"
                  required
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="small-form-comments">Comments</FieldLabel>
              <Textarea
                id="small-form-comments"
                placeholder="Add any additional comments"
              />
            </Field>
            <Field orientation="horizontal">
              <Button type="submit">Submit</Button>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};
