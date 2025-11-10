"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, AlertTriangle, CheckCircle2, Code2, FileCode } from "lucide-react";
import { debugAPI, type DebugRequest } from "@/lib/api";
import ReactMarkdown from "react-markdown";

export default function DebugForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const [issueDescription, setIssueDescription] = useState("");
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState("");
  const [body, setBody] = useState("");
  const [statusCode, setStatusCode] = useState("");
  const [responseBody, setResponseBody] = useState("");
  const [authType, setAuthType] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const requestData: DebugRequest = {
        issue_description: issueDescription,
      };

      if (url) {
        requestData.api_request = {
          method,
          url,
          headers: headers ? JSON.parse(headers) : {},
          body: body ? JSON.parse(body) : undefined,
        };
      }

      if (statusCode) {
        requestData.api_response = {
          status_code: parseInt(statusCode),
          body: responseBody,
        };
      }

      if (authType) {
        requestData.auth_type = authType;
      }

      const response = await debugAPI(requestData);
      setResult(response);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const loadExample = (example: string) => {
    switch (example) {
      case "401":
        setIssueDescription("Getting 401 Unauthorized error when trying to access the API");
        setMethod("GET");
        setUrl("https://api.github.com/user");
        setHeaders(JSON.stringify({ Authorization: "Bearer expired_token_123" }, null, 2));
        setBody("");
        setStatusCode("401");
        setResponseBody(JSON.stringify({ message: "Bad credentials" }, null, 2));
        setAuthType("bearer");
        break;
      case "400":
        setIssueDescription("API returns 400 Bad Request with validation error");
        setMethod("POST");
        setUrl("https://api.example.com/users");
        setHeaders(JSON.stringify({ "Content-Type": "application/json" }, null, 2));
        setBody(JSON.stringify({ name: "John", age: "twenty-five", email: "invalid-email" }, null, 2));
        setStatusCode("400");
        setResponseBody(JSON.stringify({ error: "age must be integer, email format invalid" }, null, 2));
        setAuthType("");
        break;
      case "429":
        setIssueDescription("Getting rate limited by the API");
        setMethod("GET");
        setUrl("https://api.example.com/data");
        setHeaders(JSON.stringify({ "X-API-Key": "my-key" }, null, 2));
        setBody("");
        setStatusCode("429");
        setResponseBody(JSON.stringify({ error: "Rate limit exceeded. Try again in 60 seconds" }, null, 2));
        setAuthType("api_key");
        break;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Example Pills */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-muted-foreground">Quick start:</span>
        <Button size="sm" className="h-8 text-xs" onClick={() => loadExample("401")}>
          401 Auth
        </Button>
        <Button size="sm" className="h-8 text-xs" onClick={() => loadExample("400")}>
          400 Validation
        </Button>
        <Button size="sm" className="h-8 text-xs" onClick={() => loadExample("429")}>
          429 Rate Limit
        </Button>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Input Form - 3 columns */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="border-2 backdrop-blur-sm bg-card/50 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-medium">Describe the Issue</CardTitle>
              <CardDescription className="text-xs">
                What API problem are you experiencing?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="issue" className="text-sm font-medium">Issue Description</Label>
                  <Textarea
                    id="issue"
                    placeholder="Example: Getting 401 Unauthorized when calling the /users endpoint..."
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    rows={3}
                    required
                    className="resize-none text-sm"
                  />
                </div>

                <Tabs defaultValue="request" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 h-9">
                    <TabsTrigger value="request" className="text-xs">Request</TabsTrigger>
                    <TabsTrigger value="response" className="text-xs">Response</TabsTrigger>
                    <TabsTrigger value="auth" className="text-xs">Auth</TabsTrigger>
                  </TabsList>

                  <TabsContent value="request" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs font-medium">Method</Label>
                        <Select value={method} onValueChange={setMethod}>
                          <SelectTrigger className="h-9 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GET">GET</SelectItem>
                            <SelectItem value="POST">POST</SelectItem>
                            <SelectItem value="PUT">PUT</SelectItem>
                            <SelectItem value="PATCH">PATCH</SelectItem>
                            <SelectItem value="DELETE">DELETE</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="url" className="text-xs font-medium">Endpoint URL</Label>
                        <input
                          id="url"
                          type="text"
                          placeholder="https://api.example.com/..."
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="headers" className="text-xs font-medium">Headers (JSON)</Label>
                      <Textarea
                        id="headers"
                        placeholder='{"Content-Type": "application/json"}'
                        value={headers}
                        onChange={(e) => setHeaders(e.target.value)}
                        rows={3}
                        className="font-mono text-xs resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="body" className="text-xs font-medium">Request Body (JSON)</Label>
                      <Textarea
                        id="body"
                        placeholder='{"key": "value"}'
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        rows={4}
                        className="font-mono text-xs resize-none"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="response" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="statusCode" className="text-xs font-medium">Status Code</Label>
                      <input
                        id="statusCode"
                        type="number"
                        placeholder="401"
                        value={statusCode}
                        onChange={(e) => setStatusCode(e.target.value)}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="responseBody" className="text-xs font-medium">Response Body</Label>
                      <Textarea
                        id="responseBody"
                        placeholder='{"error": "Unauthorized"}'
                        value={responseBody}
                        onChange={(e) => setResponseBody(e.target.value)}
                        rows={8}
                        className="font-mono text-xs resize-none"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="auth" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Authentication Type</Label>
                      <Select value={authType} onValueChange={setAuthType}>
                        <SelectTrigger className="h-9 text-sm">
                          <SelectValue placeholder="Select type (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bearer">Bearer Token</SelectItem>
                          <SelectItem value="api_key">API Key</SelectItem>
                          <SelectItem value="oauth2">OAuth2</SelectItem>
                          <SelectItem value="basic">Basic Auth</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Optional: Helps agents provide auth-specific guidance
                    </p>
                  </TabsContent>
                </Tabs>

                <Button type="submit" className="w-full h-10" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing
                    </>
                  ) : (
                    <>
                      <Code2 className="mr-2 h-4 w-4" />
                      Analyze Issue
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Results Panel - 2 columns */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-6">
            <Card className="border-2 backdrop-blur-sm bg-card/50 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium">Diagnosis</CardTitle>
                <CardDescription className="text-xs">
                  AI-generated analysis and solution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <div className="flex items-start gap-3 p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                    <div className="space-y-1 flex-1">
                      <p className="text-xs font-medium">Error</p>
                      <p className="text-xs text-muted-foreground">{error}</p>
                    </div>
                  </div>
                )}

                {result && (
                  <div className="space-y-4">
                    {result.root_cause && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-md bg-orange-500/10 flex items-center justify-center">
                            <AlertTriangle className="h-3.5 w-3.5 text-orange-600" />
                          </div>
                          <h3 className="text-sm font-medium">Root Cause</h3>
                        </div>
                        <p className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-md leading-relaxed">
                          {result.root_cause}
                        </p>
                      </div>
                    )}

                    {result.solution && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-md bg-green-500/10 flex items-center justify-center">
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                          </div>
                          <h3 className="text-sm font-medium">Solution</h3>
                        </div>
                        <div className="prose prose-sm dark:prose-invert max-w-none bg-muted/50 p-4 rounded-md overflow-auto max-h-[500px] text-xs">
                          <ReactMarkdown
                            components={{
                              h1: ({ node, ...props }) => <h1 className="text-sm font-semibold mt-4 mb-2" {...props} />,
                              h2: ({ node, ...props }) => <h2 className="text-sm font-semibold mt-3 mb-2" {...props} />,
                              h3: ({ node, ...props }) => <h3 className="text-xs font-semibold mt-2 mb-1" {...props} />,
                              p: ({ node, ...props }) => <p className="text-xs leading-relaxed mb-2" {...props} />,
                              code: ({ node, ...props }) => <code className="text-xs bg-background px-1 py-0.5 rounded" {...props} />,
                              pre: ({ node, ...props }) => <pre className="text-xs bg-background p-2 rounded my-2 overflow-x-auto" {...props} />,
                              ul: ({ node, ...props }) => <ul className="text-xs space-y-1 my-2" {...props} />,
                              ol: ({ node, ...props }) => <ol className="text-xs space-y-1 my-2" {...props} />,
                              li: ({ node, ...props }) => <li className="text-xs" {...props} />,
                            }}
                          >
                            {result.solution}
                          </ReactMarkdown>
                        </div>
                      </div>
                    )}

                    {result.analysis_results && (
                      <details className="group">
                        <summary className="flex items-center gap-2 text-xs font-medium cursor-pointer hover:text-primary transition-colors">
                          <FileCode className="h-3.5 w-3.5" />
                          <span>View Technical Details</span>
                        </summary>
                        <pre className="text-[10px] bg-muted/50 p-3 rounded-md overflow-auto max-h-48 mt-2 font-mono">
                          {JSON.stringify(result.analysis_results, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                )}

                {!result && !error && !loading && (
                  <div className="text-center py-16 text-muted-foreground">
                    <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                      <Code2 className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-medium mb-1">No analysis yet</p>
                    <p className="text-xs">Submit your API issue to get started</p>
                  </div>
                )}

                {loading && (
                  <div className="text-center py-16">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
                    <p className="text-sm font-medium mb-1">Analyzing</p>
                    <p className="text-xs text-muted-foreground">
                      AI agents are diagnosing your issue...
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}