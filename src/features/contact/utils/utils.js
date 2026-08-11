import apiClient from "../../../api/apiClient";

export async function contactAction({ request, params }) {
  try {
    const data = await request.formData();

    const contactData = {
      name: data.get("name"),
      email: data.get("email"),
      mobileNumber: data.get("mobileNumber"),
      message: data.get("message"),
    };

    await apiClient.post("/contacts", contactData);
    return { success: true };
  } catch (error) {
    if (error.response?.status === 400) {
      return {
        success: false,
        errors: error.response?.data,
      };
    }
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to save contact. Please try again.",
      { status: error.status || 500 },
    );
  }
}
