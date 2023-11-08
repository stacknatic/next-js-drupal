<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* modules/contrib/symfony_mailer/templates/email-wrap.html.twig */
class __TwigTemplate_bbf455743729dc872210c08d4a76e688 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 20
        $context["classes"] = [0 => ("email-type-" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed(        // line 21
($context["type"] ?? null), 21, $this->source))), 1 => ("email-sub-type-" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed(        // line 22
($context["sub_type"] ?? null), 22, $this->source)))];
        // line 25
        echo "
";
        // line 26
        if (($context["is_html"] ?? null)) {
            // line 27
            echo "<html>
<body>
<div";
            // line 29
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["attributes"] ?? null), "addClass", [0 => ($context["classes"] ?? null)], "method", false, false, true, 29), 29, $this->source), "html", null, true);
            echo ">
  <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\">
    <tr>
      <td>
        <div style=\"padding: 0px 0px 0px 0px;\" class=\"clearfix\">
          ";
            // line 34
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["body"] ?? null), 34, $this->source), "html", null, true);
            echo "
        </div>
      </td>
    </tr>
  </table>
</div>
</body>
</html>
";
        } else {
            // line 43
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["body"] ?? null), 43, $this->source), "html", null, true);
            echo "
";
        }
    }

    public function getTemplateName()
    {
        return "modules/contrib/symfony_mailer/templates/email-wrap.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  72 => 43,  60 => 34,  52 => 29,  48 => 27,  46 => 26,  43 => 25,  41 => 22,  40 => 21,  39 => 20,);
    }

    public function getSourceContext()
    {
        return new Source("{#
/**
 * @file
 * Default theme implementation for Symfony Email wrapper.
 *
 * Variables:
 * - body: Email body content.
 * - is_html: True if generating HTML output, false for plain text.
 * - subject: Email subject.
 * - type: Email type.
 * - sub_type: Email sub-type.
 * - attributes: HTML attributes for the top-level email element.
 *
 * @see template_preprocess_email_wrap()
 *
 * @ingroup themeable
 */
#}
{%
  set classes = [
    'email-type-' ~ type|clean_class,
    'email-sub-type-' ~ sub_type|clean_class,
  ]
%}

{% if is_html %}
<html>
<body>
<div{{ attributes.addClass(classes) }}>
  <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\">
    <tr>
      <td>
        <div style=\"padding: 0px 0px 0px 0px;\" class=\"clearfix\">
          {{ body }}
        </div>
      </td>
    </tr>
  </table>
</div>
</body>
</html>
{% else %}
{{ body }}
{% endif %}
", "modules/contrib/symfony_mailer/templates/email-wrap.html.twig", "/app/drupal/web/modules/contrib/symfony_mailer/templates/email-wrap.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("set" => 20, "if" => 26);
        static $filters = array("clean_class" => 21, "escape" => 29);
        static $functions = array();

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if'],
                ['clean_class', 'escape'],
                []
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}
