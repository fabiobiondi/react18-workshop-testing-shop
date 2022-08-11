import clsx from "clsx";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckoutForm } from "./hooks/useCheckoutForm";

export default function CheckoutPage() {
  const { formData, dirty, formValidation, isFormValid, validateName, updateField, reset, submit } = useCheckoutForm();
  const navigate = useNavigate();

  function onChangeHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const name = e.currentTarget.name;
    if (!validateName(name)) {
      throw new Error(`Invalid name: ${name}`);
    }
    const value =
      e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;

    updateField(name, value);
  }

  async function onConfirmFormHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await submit()
      navigate("/checkout-confirm");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <form onSubmit={onConfirmFormHandler} className="space-y-6">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Shipping Info
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Add the address where you want to receive products{" "}
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      value={formData.first_name}
                      onChange={onChangeHandler}
                      className={clsx("form-input", {
                        error: !!formValidation.first_name && dirty,
                      })}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      value={formData.last_name}
                      onChange={onChangeHandler}
                      className={clsx("form-input", {
                        error: !!formValidation.last_name && dirty,
                      })}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={onChangeHandler}
                      className={clsx("form-input", {
                        error: !!formValidation.email && dirty,
                      })}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country / Region
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={onChangeHandler}
                      className={clsx("form-input", {
                        error: !!formValidation.country && dirty,
                      })}
                    >
                      <option value="">Select Country</option>
                      <option>Italy</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Street address
                    </label>
                    <input
                      type="text"
                      name="street"
                      id="street"
                      value={formData.street}
                      onChange={onChangeHandler}
                      className={clsx("form-input", {
                        error: !!formValidation.street && dirty,
                      })}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={formData.city}
                      onChange={onChangeHandler}
                      className={clsx("form-input", {
                        error: !!formValidation.city && dirty,
                      })}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="state_prov"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State / Province
                    </label>
                    <input
                      type="text"
                      name="state_prov"
                      id="state_prov"
                      value={formData.state_prov}
                      onChange={onChangeHandler}
                      className={clsx("form-input", {
                        error: !!formValidation.state_prov && dirty,
                      })}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="zip"
                      className="block text-sm font-medium text-gray-700"
                    >
                      ZIP / Postal
                    </label>
                    <input
                      type="text"
                      name="zip"
                      id="zip"
                      value={formData.zip}
                      onChange={onChangeHandler}
                      className={clsx("form-input", {
                        error: !!formValidation.zip && dirty,
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Notifications
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Decide which communications you'd like to receive and how.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="space-y-6">
                <fieldset>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="h-5 flex items-center">
                        <input
                          id="notification_email"
                          name="notification_email"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          checked={formData.notification_email}
                          onChange={onChangeHandler}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="notification_email"
                          className="font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <p className="text-gray-500">
                          Get notified when someones posts a comment on a
                          posting.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="notification_sms"
                          name="notification_sms"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          checked={formData.notification_sms}
                          onChange={onChangeHandler}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="notification_sms"
                          className="font-medium text-gray-700"
                        >
                          SMS
                        </label>
                        <p className="text-gray-500">
                          Get notified when a candidate applies for a job.
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={reset}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Clean
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500; disabled:opacity-50"
            disabled={!isFormValid}
          >
            Send Order
          </button>
        </div>
      </form>
    </div>
  );
}
