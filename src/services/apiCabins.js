/* eslint-disable no-unused-vars */
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("The cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Create / Edit cabin
  let query = supabase.from("cabins");

  // 1. create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // Edit
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("The Cabin could not be created");
  }

  if (hasImagePath) return data;
  //2. upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    const { data, error } = await supabase
      .from("cabins")
      .delete()
      .eq("id", data.id);

    console.log(storageError);
    throw new Error("The image was not uploaded and the cabin did not created");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("The cabin could not be deleted");
  }

  return data;
}
