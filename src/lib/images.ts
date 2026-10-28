/** Size the original Cloudinary asset before it reaches the browser. */
export function getCloudinaryImageUrl(source: string, size: number): string {
  return source.replace(
    "/image/upload/",
    `/image/upload/f_auto,q_auto,c_fill,w_${size},h_${size}/`,
  );
}
