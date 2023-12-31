"use client";

import { useEffect, useState } from "react";

import { useProModal } from "@/hooks/use-pro-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import axios from "axios";

export const ProModal = () => {
  const proModal = useProModal();
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubscribe = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something Went Wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">Upgrade to Pro</DialogTitle>
          <DialogDescription className="text-center">
            Create <span className="text-sky-500 font-medium">Custom AI</span>{" "}
            Companions!
          </DialogDescription>
          <Separator />
        </DialogHeader>

        <div className="flex justify-between">
          <p className="text-4xl font-medium">
            9<span className="text-sm font-normal">.99$ / mo</span>
          </p>

          <Button variant="premium" disabled={loading} onClick={onSubscribe}>
            Subscribe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
