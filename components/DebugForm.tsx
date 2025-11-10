"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, AlertCircle, CheckCircle2, Zap, Code2, Shield, Activity } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-2">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">AI-Powered Multi-Agent System</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
            API Integration Debugger
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Diagnose and fix API issues in seconds with intelligent analysis
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <Card className="border-muted hover:border-primary/50 transition-colors">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                <Code2 className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-sm">Smart Analysis</h3>
              <p className="text-xs text-muted-foreground">AI agents analyze your API issues</p>
            </CardContent>
          </Card>
          <Card className="border-muted hover:border-primary/50 transition-colors">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-sm">Auth Detection</h3>
              <p className="text-xs text-muted-foreground">Automatic authentication debugging</p>
            </CardContent>
          </Card>
          <Card className="border-muted hover:border-primary/50 transition-colors">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-sm">Instant Solutions</h3>
              <p className="text-xs text-muted-foreground">Get actionable fixes immediately</p>
            </CardContent>
          </Card>
        </div>

        {/* Example Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => loadExample("401")}
            className="hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200 dark:hover:bg-orange-950/20"
          >
            <Badge variant="outline" className="mr-2 border-orange-500 text-orange-700 dark:text-orange-400">401</Badge>
            Auth Error
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => loadExample("400")}
            className="hover:bg-red-50 hover:text-red-700 hover:border-red-200 dark:hover:bg-red-950/20"
          >
            <Badge variant="outline" className="mr-2 border-red-500 text-red-700 dark:text-red-400">400</Badge>
            Validation Error
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => loadExample("429")}
            className="hover:bg-yellow-50 hover:text-yellow-700 hover:border-yellow-200 dark:hover:bg-yellow-950/20"
          >
            <Badge variant="outline" className="mr-2 border-yellow-500 text-yellow-700 dark:text-yellow-400">429</Badge>
            Rate Limit
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Enhanced Input Form */}
          <Card className="border-muted shadow-lg lg:h-fit">
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Debug Request</CardTitle>
                <Badge variant="secondary" className="text-xs">Required</Badge>
              </div>
              <CardDescription>
                Provide details about your API problem for AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="issue" className="text-base font-semibold">Issue Description</Label>
                  <Textarea
                    id="issue"
                    placeholder="e.g., I'm getting 401 Unauthorized error when calling the API"
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    rows={3}
                    required
                    className="resize-none"
                  />
                </div>

                <Separator />

                <Tabs defaultValue="request" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="request">Request</TabsTrigger>
                    <TabsTrigger value="response">Response</TabsTrigger>
                    <TabsTrigger value="auth">Auth</TabsTrigger>
                  </TabsList>

                  <TabsContent value="request" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">HTTP Method</Label>
                        <Select value={method} onValueChange={setMethod}>
                          <SelectTrigger>
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
                        <Label htmlFor="url" className="text-sm font-medium">URL</Label>
                        <input
                          id="url"
                          type="text"
                          placeholder="https://api.example.com"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="headers" className="text-sm font-medium">Headers (JSON)</Label>
                      <Textarea
                        id="headers"
                        placeholder='{"Content-Type": "application/json"}'
                        value={headers}
                        onChange={(e) => setHeaders(e.target.value)}
                        rows={3}
                        className="font-mono text-xs"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="body" className="text-sm font-medium">Request Body (JSON)</Label>
                      <Textarea
                        id="body"
                        placeholder='{"key": "value"}'
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        rows={4}
                        className="font-mono text-xs"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="response" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="statusCode" className="text-sm font-medium">Status Code</Label>
                      <input
                        id="statusCode"
                        type="number"
                        placeholder="e.g., 401"
                        value={statusCode}
                        onChange={(e) => setStatusCode(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="responseBody" className="text-sm font-medium">Response Body</Label>
                      <Textarea
                        id="responseBody"
                        placeholder='{"error": "Unauthorized"}'
                        value={responseBody}
                        onChange={(e) => setResponseBody(e.target.value)}
                        rows={8}
                        className="font-mono text-xs"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="auth" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Authentication Type</Label>
                      <Select value={authType} onValueChange={setAuthType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select auth type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bearer">Bearer Token</SelectItem>
                          <SelectItem value="api_key">API Key</SelectItem>
                          <SelectItem value="oauth2">OAuth2</SelectItem>
                          <SelectItem value="basic">Basic Auth</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        Select the authentication method used by your API for better diagnosis
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>

                <Button type="submit" className="w-full h-11 text-base font-semibold" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-5 w-5" />
                      Debug My API
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Enhanced Results Panel */}
          <Card className="border-muted shadow-lg lg:sticky lg:top-8 lg:self-start lg:max-h-[calc(100vh-4rem)] flex flex-col">
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Analysis Results</CardTitle>
                {result && (
                  <Badge variant="default" className="bg-green-500">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Complete
                  </Badge>
                )}
              </div>
              <CardDescription>
                AI-generated diagnosis and solution
              </CardDescription>
            </CardHeader>
            <CardContent className="lg:overflow-y-auto lg:max-h-[calc(100vh-16rem)]">
              {error && (
                <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                  <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-semibold text-destructive">Error Occurred</p>
                    <p className="text-sm text-destructive/90">{error}</p>
                  </div>
                </div>
              )}

              {result && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Root Cause */}
                  {result.root_cause && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center">
                          <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-500" />
                        </div>
                        <h3 className="font-semibold text-lg">Root Cause</h3>
                      </div>
                      <Card className="border-orange-200 dark:border-orange-900/30 bg-orange-50/50 dark:bg-orange-950/10">
                        <CardContent className="pt-4">
                          <p className="text-sm leading-relaxed">{result.root_cause}</p>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* Solution */}
                  {result.solution && (
                    <>
                      <Separator />
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-950/30 flex items-center justify-center">
                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />
                          </div>
                          <h3 className="font-semibold text-lg">Recommended Solution</h3>
                        </div>
                        <Card className="border-green-200 dark:border-green-900/30 bg-green-50/50 dark:bg-green-950/10">
                          <CardContent className="pt-4">
                            <div className="prose prose-sm dark:prose-invert max-w-none overflow-auto max-h-[400px]">
                              <ReactMarkdown>{result.solution}</ReactMarkdown>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </>
                  )}

                  {/* Analysis Details */}
                  {result.analysis_results && (
                    <>
                      <Separator />
                      <details className="group">
                        <summary className="flex items-center gap-2 font-semibold cursor-pointer hover:text-primary transition-colors list-none">
                          <div className="h-5 w-5 rounded bg-muted flex items-center justify-center text-xs group-open:rotate-90 transition-transform">
                            →
                          </div>
                          View Detailed Analysis
                        </summary>
                        <Card className="mt-3 border-muted">
                          <CardContent className="pt-4">
                            <pre className="text-xs bg-muted/50 p-4 rounded-md overflow-auto max-h-64 font-mono">
                              {JSON.stringify(result.analysis_results, null, 2)}
                            </pre>
                          </CardContent>
                        </Card>
                      </details>
                    </>
                  )}
                </div>
              )}

              {!result && !error && !loading && (
                <div className="text-center py-16 space-y-4">
                  <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                    <Code2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">Ready to Debug</p>
                    <p className="text-sm text-muted-foreground">
                      Fill out the form and submit to see AI analysis
                    </p>
                  </div>
                </div>
              )}

              {loading && (
                <div className="text-center py-16 space-y-4 animate-in fade-in duration-300">
                  <div className="relative mx-auto h-16 w-16">
                    <Loader2 className="h-16 w-16 animate-spin text-primary" />
                    <div className="absolute inset-0 h-16 w-16 rounded-full bg-primary/20 animate-ping" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold">AI Agents Analyzing</p>
                    <p className="text-sm text-muted-foreground">
                      Processing your API issue with multi-agent system...
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
