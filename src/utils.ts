import { formatEther, type BigNumberish } from "ethers"

/**
 * Convert wei to $TOPIA
 * @param amount total amount in wei
 * @returns total in $TOPIA
 */
export const toTOPIA = (amount: BigNumberish): string => {
  return formatEther(amount)
}
