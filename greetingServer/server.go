package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/rs/cors"
)

type RequestData struct {
	InputString string `json:"inputString"`
}

type ResponseData struct {
	OutputString string `json:"outputString"`
}

func main() {
	corsHandler := cors.Default().Handler

	http.Handle("/api/addHello", corsHandler(http.HandlerFunc(addHelloHandler)))

	fmt.Println("Server is running on :8080...")
	http.ListenAndServe(":8080", nil)
}

func addHelloHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var requestData RequestData
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	outputString := fmt.Sprintf("Hello %s", requestData.InputString)

	responseData := ResponseData{OutputString: outputString}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(responseData); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
