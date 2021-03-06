# frozen_string_literal: true

module JsonLdHelper
  def equals_or_includes?(haystack, needle)
    haystack.is_a?(Array) ? haystack.include?(needle) : haystack == needle
  end

  def first_of_value(value)
    value.is_a?(Array) ? value.first : value
  end

  # The url attribute can be a string, an array of strings, or an array of objects.
  # The objects could include a mimeType. Not-included mimeType means it's text/html.
  def url_to_href(value, preferred_type = nil)
    single_value = if value.is_a?(Array) && !value.first.is_a?(String)
                     value.find { |link| preferred_type.nil? || ((link['mimeType'].presence || 'text/html') == preferred_type) }
                   elsif value.is_a?(Array)
                     value.first
                   else
                     value
                   end

    if single_value.nil? || single_value.is_a?(String)
      single_value
    else
      single_value['href']
    end
  end

  def as_array(value)
    value.is_a?(Array) ? value : [value]
  end

  def value_or_id(value)
    value.is_a?(String) || value.nil? ? value : value['id']
  end

  def supported_context?(json)
    !json.nil? && equals_or_includes?(json['@context'], ActivityPub::TagManager::CONTEXT)
  end

  def canonicalize(json)
    graph = RDF::Graph.new << JSON::LD::API.toRdf(json)
    graph.dump(:normalize)
  end

  def fetch_resource(uri, id)
    unless id
      json = fetch_resource_without_id_validation(uri)
      return unless json
      uri = json['id']
    end

    json = fetch_resource_without_id_validation(uri)
    json.present? && json['id'] == uri ? json : nil
  end

  def fetch_resource_without_id_validation(uri)
    response = build_request(uri).perform
    return if response.code != 200
    body_to_json(response.to_s)
  end

  def body_to_json(body)
    body.is_a?(String) ? Oj.load(body, mode: :strict) : body
  rescue Oj::ParseError
    nil
  end

  def merge_context(context, new_context)
    if context.is_a?(Array)
      context << new_context
    else
      [context, new_context]
    end
  end

  private

  def build_request(uri)
    request = Request.new(:get, uri)
    request.add_headers('Accept' => 'application/activity+json, application/ld+json')
    request
  end
end
