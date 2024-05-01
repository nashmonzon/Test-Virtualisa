"use server";

import { APIError } from "@/lib/error";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export type ApiError = {
  success: false;
  message: string;
  status?: number;
};

type FetcherResponse<T> = {
  success: true;
  data: T;
};

export const fetcher = async <R = unknown>(
  url: string,
  config?: RequestInit
): Promise<FetcherResponse<R> | ApiError> => {
  const { ...restConfig } = config || {};
  try {
    const res = await fetch(`http://localhost:4000${url}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      ...restConfig,
    });

    if (!res.ok) {
      throw new APIError(await res.text(), res.status);
    }

    const { error, ...data } = await res.json();

    if (!!data?.error || !!error || data?.success === false) {
      throw new APIError(
        data.error || data?.message || error?.message || error,
        res.status
      );
    }

    return { success: true, data };
  } catch (e) {
    const error = e as ApiError;
    return error;
  }
};

export const revalidateTags = async (tags: string | string[]) => {
  return await (Array.isArray(tags)
    ? tags.forEach((tag) => revalidateTag(tag))
    : revalidateTag(tags));
};

export const redirects = async (url: string) => {
  return await redirect(url);
};
