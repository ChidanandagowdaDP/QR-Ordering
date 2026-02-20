import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const AdminDashboard = () => {
  const [storeId, setStoreId] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [qrData, setQrData] = useState(null); // store generated QR data
  const qrRef = useRef();

  const handleGenerateQR = () => {
    if (!storeId || !tableNumber) {
      alert("Please enter store ID and select table number.");
      return;
    }
    const payload = {
      store: storeId,
      table: tableNumber,
    };
    const encoded = btoa(JSON.stringify(payload));
    setQrData(`https://qr-ordering-a0yy.onrender.com/?data=${encoded}`);
  };

  const handleDownload = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `Store_${storeId}_Table_${tableNumber}.png`;
    link.click();
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Admin QR Generator
      </h2>

      {/* Store & Table Inputs */}
      <div className="flex flex-col gap-3 mb-4">
        <input
          type="text"
          placeholder="Store ID"
          value={storeId}
          onChange={(e) => setStoreId(e.target.value)}
          className="px-3 py-2 border rounded shadow-sm"
        />

        <select
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          className="px-3 py-2 border rounded shadow-sm"
        >
          <option value="">Select Table Number</option>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              Table {num}
            </option>
          ))}
        </select>

        <button
          onClick={handleGenerateQR}
          className="bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          Generate QR
        </button>
      </div>

      {/* QR Code */}
      {qrData && (
        <div className="flex flex-col items-center gap-2">
          <div ref={qrRef} className="p-4 bg-white shadow-md rounded">
            <QRCodeCanvas value={qrData} size={200} />
          </div>

          {/* Display table number below QR */}
          <p className="font-medium text-gray-700">
            Table Number: {tableNumber}
          </p>

          <button
            onClick={handleDownload}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
