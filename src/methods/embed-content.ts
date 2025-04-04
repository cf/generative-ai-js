/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  BatchEmbedContentsRequest,
  BatchEmbedContentsResponse,
  EmbedContentRequest,
  EmbedContentResponse,
  RequestOptions,
} from "../../types";
import { Task, makeModelRequest } from "../requests/request";

export async function embedContent(
  apiKey: string,
  model: string,
  params: EmbedContentRequest,
  requestOptions?: RequestOptions,
): Promise<EmbedContentResponse> {
  const response = await makeModelRequest(
    model,
    Task.EMBED_CONTENT,
    apiKey,
    false,
    JSON.stringify(params),
    requestOptions,
    requestOptions?.fetch
  );
  return response.json();
}

export async function batchEmbedContents(
  apiKey: string,
  model: string,
  params: BatchEmbedContentsRequest,
  requestOptions?: RequestOptions,
): Promise<BatchEmbedContentsResponse> {
  const requestsWithModel: EmbedContentRequest[] = params.requests.map(
    (request) => {
      return { ...request, model };
    },
  );
  const response = await makeModelRequest(
    model,
    Task.BATCH_EMBED_CONTENTS,
    apiKey,
    false,
    JSON.stringify({ requests: requestsWithModel }),
    requestOptions,
    requestOptions?.fetch
  );
  return response.json();
}
