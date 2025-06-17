<?php

namespace SyntheticCore\Supports\Traits;

use Illuminate\Http\JsonResponse;

trait ResponseTrait
{
    protected $responseMessages = [];

    protected function response($status = 200, array | object $data = [], array $headers = [], $tracer = null): JsonResponse
    {
        if(is_object($data) && \method_exists($data, 'toArray')){
            $data = $data->toArray();
        }

        $response = [
            'message' => $this->responseMessages,
            'tracer'  => $tracer,
            'data'    => null,
        ];
        if (is_array($data) && isset($data['data'])) {
            $response = array_merge($response, $data);
        } else {
            $response['data'] = $data;
        }

        if (empty($response['data'])) {
            $response['data'] = (object) $response['data'];
        }

        return response()->json($response, $status, $headers);
    }

    protected function addResponseMessage($type, $message)
    {
        if (!isset($this->responseMessages[$type])) {
            $this->responseMessages[$type] = [];
        }

        $this->responseMessages[$type][] = $message;
    }

    protected function getResponseMessage($type)
    {
        if (!isset($this->responseMessages[$type])) {
            return [];
        }

        return $this->responseMessages[$type];
    }

    protected function getAllResponseMessages()
    {
        return $this->responseMessages;
    }

    /**
     * Returns a success response with the provided data and message.
     *
     * @param array $data The data to be included in the response.
     * @param string $message The success message.
     * @return \Illuminate\Http\JsonResponse The JSON response.
     */
    protected function responseSuccess(array | object $data = [], $message = 'Data Retrieved Successfully')
    {
        $this->addResponseMessage('success', $message);

        // must send the paginated data as an array using the toArray() method.
        return $this->response(200, $data);
    }

    protected function responseError($message = 'Data Retrieval Failed')
    {
        $this->addResponseMessage('error', $message);
        return $this->response(422, []);
    }

    protected function responseBadRequest($message = 'Bad Request')
    {
        $this->addResponseMessage('error', $message);
        return $this->response(400, []);
    }

    protected function responseNotFound($message = 'Resource Not Found')
    {
        $this->addResponseMessage('error', $message);
        return $this->response(404, []);
    }

    protected function responseDeny()
    {
        $this->addResponseMessage('error', 'Access Denied');
        return $this->response(403, []);
    }

    protected function responseServerError($message = 'Internal Server Error')
    {
        $this->addResponseMessage('error', $message);
        return $this->response(500, []);
    }

    /**
     * Retrieves the data structure and returns a response. This will use in all getStructure methods.
     *
     * @param object $structure The data structure object.
     * @param string $message The success message.
     * @return \Illuminate\Http\JsonResponse The JSON response.
     */
    protected function responseStructure(object|array $structure, $message = 'Data Structure Retrieved Successfully')
    {
        $this->addResponseMessage('success', $message);
        return $this->response(200, $structure->build());
    }

    protected function responseInsertSuccess(array | object $data = [], $message = 'Data Inserted Successfully')
    {
        $this->addResponseMessage('success', $message);
        return $this->response(200, $data);
    }

    protected function responseInsertError(array $data = [], $message = 'Data Insertion Failed')
    {
        $this->addResponseMessage('error', $message);
        return $this->response(200, $data);
    }

    protected function responseUpdateSuccess(array | object $data = [], $message = 'Data Updated Successfully')
    {
        $this->addResponseMessage('success', $message);
        return $this->response(200, $data);
    }
    protected function responseResetSuccess(array | object $data = [], $message = 'Data Reset Successfully')
    {
        $this->addResponseMessage('success', $message);
        return $this->response(200, $data);
    }
    protected function responseUpdateError(array $data = [], $message = 'Data Update Failed')
    {
        $this->addResponseMessage('error', $message);
        return $this->response(200, $data);
    }

    protected function responseSoftDeleteSuccess($message = 'Data Has Been Trashed Successfully')
    {
        $this->addResponseMessage('success', $message);
        return $this->response(200, []);
    }

    protected function responseSoftDeleteError($message = 'Data Trashing Failed')
    {
        $this->addResponseMessage('error', $message);
        return $this->response(200, []);
    }

    protected function responseHardDeleteSuccess($message = 'Data Has Been Deleted Successfully')
    {
        $this->addResponseMessage('success', $message);
        return $this->response(200, []);
    }

    protected function responseHardDeleteError($message = 'Data Deletion Failed')
    {
        $this->addResponseMessage('error', $message);
        return $this->response(200, []);
    }

    protected function responseRestoreSuccess($message = 'Data Has Been Restored Successfully')
    {
        $this->addResponseMessage('success', $message);
        return $this->response(200, []);
    }

    /**
     * Generates a response with no content if $content is empty.
     *
     * @param string $message The success message.
     * @return \Illuminate\Http\JsonResponse The JSON response.
     */
    protected function responseNoContent($message = 'No Content')
    {
        $this->addResponseMessage('success', $message);
        return $this->response(200, []);
    }

    /**
     * Unable to process the request because it contains invalid data.
     *
     * @param string $message The error message.
     * @return \Illuminate\Http\JsonResponse The JSON response.
     */
    protected function responseInvalidRequest($message = 'Invalid Request')
    {
        $this->addResponseMessage('error', $message);
        return $this->response(422, []);
    }

    protected function responseValidationFailed(array $errors)
    {
        foreach ($errors as $key => $value) {
            $this->addResponseMessage('error', $value[0]);
        }

        return $this->response(422, []);
    }

    protected function responseTest($message = 'Test')
    {
        $this->addResponseMessage('success', $message);
        return $this->response(200, []);
    }
}
