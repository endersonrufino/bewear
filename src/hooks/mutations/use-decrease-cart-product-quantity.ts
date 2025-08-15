import { useMutation, useQueryClient } from "@tanstack/react-query";

import { decreaseCartProductQuantity } from "@/actions/decrease-cart-quantity";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getUseDecreaseCartProductQuantityMutationKey = (
  cartItemId: string,
) => ["decrease-cart-product-quantity", cartItemId] as const;

export const useDecreaseCartProductQuantity = (cartItemId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getUseDecreaseCartProductQuantityMutationKey(cartItemId),
    mutationFn: () => decreaseCartProductQuantity({ cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    },
  });
};
