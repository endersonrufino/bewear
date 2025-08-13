import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { formatCentsToBrl } from "@/helpers/money";
import { useDecreaseCartProductQuantity } from "@/hooks/mutations/use-decrease-cart-product-quantity";
import { useIncreaseCartProductQuantity } from "@/hooks/mutations/use-increment-cart-product-quantity";
import { useRemoveProductFromCart } from "@/hooks/mutations/use-remove-product-from-cart";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantId: string;
  productVariantName: string;
  imageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({ id, productName, productVariantId, productVariantName, imageUrl, productVariantPriceInCents, quantity }: CartItemProps) => {

  const removeProductFromCartMutation = useRemoveProductFromCart(id);

  const decreaseCartProductQuantityMutation = useDecreaseCartProductQuantity(id);

  const increaseCartProductQuantityMutation = useIncreaseCartProductQuantity(productVariantId)

  const handleDeleteClick = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido do carrinho.")
      },
      onError: () => {
        toast.error("Erro ao remover produto do carrinho.")
      }
    });
  }

  const handleDecreaseCartProductQuantity = () => {
    decreaseCartProductQuantityMutation.mutate()
  }

  const handleIncreaseCartProductQuantity = () => {
    increaseCartProductQuantityMutation.mutate()
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={imageUrl}
          alt={productVariantName}
          width={78}
          height={78}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{productName}</p>
          <p className="text-muted-foreground text-xs font-medium">
            {productVariantName}
          </p>
          <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
            <Button className="h-4 w-4" variant="ghost" onClick={handleDecreaseCartProductQuantity}>
              <MinusIcon />
            </Button>
            <p className="text-xs font-medium">{quantity}</p>
            <Button className="h-4 w-4" variant="ghost" onClick={handleIncreaseCartProductQuantity}>
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-2">
        <Button variant="outline" size="icon" className="cursor-pointer" onClick={handleDeleteClick}>
          <TrashIcon />
        </Button>
        <p className="text-sm font-bold">
          {formatCentsToBrl(productVariantPriceInCents * quantity)}
        </p>
      </div>
    </div>
  )
}

export default CartItem;