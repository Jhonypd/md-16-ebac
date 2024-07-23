import { renderHook, act } from "@testing-library/react";
import useCurrencyConverter from "../useCurrencyConvert";

describe("useCurrencyConverter", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should handle successful conversion", async () => {
		const mockConvert = jest.fn().mockResolvedValue(100);

		const { result } = renderHook(() => useCurrencyConverter(mockConvert));

		act(() => {
			result.current.setAmount("50");
			result.current.setFromCurrency("USD");
			result.current.setToCurrency("EUR");
		});

		await act(async () => {
			await result.current.handleConvert();
			expect(result.current.result).toBe(100);
		});
	});

	it("should handle invalid amount", () => {
		const mockConvert = jest.fn();

		const { result } = renderHook(() => useCurrencyConverter(mockConvert));

		act(() => {
			result.current.handleAmountChange({ target: { value: "invalid" } } as any);
		});

		expect(result.current.validConversion).toBe(false);
	});

	it("should handle conversion failure", async () => {
		const mockConvert = jest.fn().mockRejectedValue(new Error("Conversion failed"));

		const { result } = renderHook(() => useCurrencyConverter(mockConvert));

		act(() => {
			result.current.setAmount("50");
			result.current.setFromCurrency("USD");
			result.current.setToCurrency("EUR");
		});

		await act(async () => {
			await result.current.handleConvert();
			expect(result.current.result).toBeNull();
		});
	});

	it("should toggle modal state", () => {
		const mockConvert = jest.fn();

		const { result } = renderHook(() => useCurrencyConverter(mockConvert));

		act(() => {
			result.current.openModal();
		});
		expect(result.current.isModalOpen).toBe(true);

		act(() => {
			result.current.closeModal();
		});
		expect(result.current.isModalOpen).toBe(false);
	});
});
