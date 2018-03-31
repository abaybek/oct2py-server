from rest_framework import serializers
from scripts.models import ScriptCode


class ScriptCodeSerializer(serializers.ModelSerializer):
	file_url = serializers.SerializerMethodField(read_only=True)
	user_folder = serializers.SerializerMethodField(read_only=True)
	class Meta:
		model  = ScriptCode
		fields = [
			'id',
			'user',
			'title',
			'description',
			'timestamp',
			'file_url',
			'user_folder'
		]
		read_only_fields = ['id', 'user']

	def get_file_url(self, obj):
		request = self.context.get("request")
		return obj.get_file_url(request=request)

	def get_user_folder(self, obj):
		return obj.get_user_folder()

	def validate_title(self, value):
		qs = ScriptCode.objects.filter(title__iexact=value)
		if self.instance:
			qs = qs.exclude(pk=self.instance.pk)
		if qs.exists():
			raise serializers.ValidationError("This title has already been used")
		return value